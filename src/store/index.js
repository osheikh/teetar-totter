// modules
import Vue from 'vue'
import Vuex from 'vuex'

// actions & constants
import {
    ON_TOGGLE_PAUSE,
    ON_ADD_RIGHT_SIDE_BLOCK,
    ON_ADD_LEFT_SIDE_BLOCK,
    ON_RESET_STATE,
    ON_FINISH_FALLING,
    ON_START_NEW_GAME,
    ON_INITIALIZE_FALLING_BLOCKS,
    ON_ADD_FALLING_BLOCK,
    ON_MOVE_RIGHT,
    ON_MOVE_LEFT,
    initalState
} from '../services/storeService'

import {
    MAX_BENDING,
    MIN_BENDING,
    MAX_SIDES_DIFFERENCE,
    FALLING_BLOCKS_COUNT,
} from '../services/constantsService'

// helpers & services
import {
    generateRandomBlock,
    getBlockPower
} from '../services/utilService'

Vue.use(Vuex);

// initial state of store


export default new Vuex.Store({
    state: initalState,
    getters: {
        leftSwingBlockPower(state) {
            return getBlockPower(state.leftSideBlocks)
        },
        rightSwingBlockPower(state) {
            return getBlockPower(state.rightSideBlocks)
        },
        swingBending(state, getters) {
            const {
                leftSwingBlockPower,
                rightSwingBlockPower
            } = getters;
            if (!leftSwingBlockPower) {
                return MAX_BENDING
            }
            if (leftSwingBlockPower === rightSwingBlockPower) {
                return 0
            }
            return leftSwingBlockPower > rightSwingBlockPower ? (leftSwingBlockPower - rightSwingBlockPower) / leftSwingBlockPower * -100 : (rightSwingBlockPower - leftSwingBlockPower) / rightSwingBlockPower * 100
        },
        gameStatus(state, getters) {
            const {
                leftSwingBlockPower,
                rightSwingBlockPower,
                swingBending
            } = getters;
            return swingBending > MAX_BENDING || swingBending < MIN_BENDING || Math.abs(leftSwingBlockPower - rightSwingBlockPower) > MAX_SIDES_DIFFERENCE
        }
    },
    mutations: {
        [ON_TOGGLE_PAUSE](state) {
            state.isPaused = !state.isPaused
        },
        [ON_ADD_RIGHT_SIDE_BLOCK](state) {
            const randomBlock = generateRandomBlock();
            state.rightSideBlocks.push(randomBlock)
        },
        [ON_ADD_LEFT_SIDE_BLOCK](state) {
            const block = state.fallingBlocks.shift();
            state.leftSideBlocks.push(block);
        },
        [ON_INITIALIZE_FALLING_BLOCKS](state) {
            state.fallingBlocks = [];
            for (let i = 0; i < FALLING_BLOCKS_COUNT; i++) {
                const randomBlock = generateRandomBlock();
                state.fallingBlocks.push(randomBlock)
            }
        },
        [ON_ADD_FALLING_BLOCK](state) {
            const randomBlock = generateRandomBlock();
            state.fallingBlocks.push(randomBlock)
        },
        [ON_MOVE_RIGHT](state) {
            if (state.isPaused || state.fallingBlocks[0].offset - 1 <= 0) {
                return
            }
            state.fallingBlocks[0].offset -= 1;
        },
        [ON_MOVE_LEFT](state) {
            if (state.isPaused || state.fallingBlocks[0].offset + 1 > 5) {
                return
            }
            state.fallingBlocks[0].offset += 1;
        },
        [ON_RESET_STATE](state) {
            state.isPaused = true;
            state.leftSideBlocks = [];
            state.rightSideBlocks = [];
            state.fallingBlocks = []
        }
    },
    actions: {
        [ON_FINISH_FALLING]({
            commit,
            state,
            getters,
            dispatch
        }) {

            commit(ON_ADD_LEFT_SIDE_BLOCK);
            commit(ON_ADD_FALLING_BLOCK);

            if (state.leftSideBlocks.length && state.leftSideBlocks.length !== state.rightSideBlocks.length) {
                commit(ON_ADD_RIGHT_SIDE_BLOCK);
            }
            if (getters.gameStatus) {
                setTimeout(() => {
                    alert('Game Over - Thanks for Playing!');
                    dispatch(ON_START_NEW_GAME);
                }, 0)
            }
        },
        [ON_START_NEW_GAME]({
            commit
        }) {
            commit(ON_RESET_STATE);
            commit(ON_ADD_RIGHT_SIDE_BLOCK);
            commit(ON_INITIALIZE_FALLING_BLOCKS);
        }
    },
})