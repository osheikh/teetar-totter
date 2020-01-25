<template>
    <section class="c-drop-shape">
        <c-falling-shape v-for="(block, index) in fallingBlocks"
                      :block="block"
                      :index="index"
                      :timeOut="timeOut"
                      @finishedFalling="onFinishFalling"
                      :key="block.id">
        </c-falling-shape>
    </section>
</template>

<script>

// modules
import { mapMutations } from 'vuex'

// components
import FallingShape from './FallingShape'

// actions & constants
import {
    ON_INITIALIZE_FALLING_BLOCKS,
    ON_MOVE_LEFT,
    ON_MOVE_RIGHT
} from '../services/storeService'

import {
    ITERATION_COUNT_INCREASING,
    TIMEOUT_STEP_DECREASING,
    INITIAL_TIMEOUT
} from '../services/constantsService'

export default {
    name: "c-drop-shape",
    components: {
        cFallingShape: FallingShape
    },
    data() {
        return {
            timeOut: INITIAL_TIMEOUT,
            iterationCounter: 0
        }
    },
    computed: {
        fallingBlocks() {
            const self = this;
            return self.$store.state.fallingBlocks;
        }
    },
    methods: {
        ...mapMutations({
            initializeFallingBlocks: ON_INITIALIZE_FALLING_BLOCKS,
            moveBlockRight: ON_MOVE_RIGHT,
            moveBlockLeft: ON_MOVE_LEFT,
        }),
        onKeyDown(event) {
            const self = this;
            // right key press
            if (event.keyCode === 39) {
                self.moveBlockRight()
            }
            // right key press
            if (event.keyCode === 37) {
                self.moveBlockLeft()
            }
        },
        onFinishFalling() {
            const self = this;
            self.iterationCounter++;
            if (self.iterationCounter === ITERATION_COUNT_INCREASING) {
                self.timeOut -= TIMEOUT_STEP_DECREASING;
                self.iterationCounter = 0;
            }
        }
    },
    beforeMount() {
        const self = this;
        self.initializeFallingBlocks();
        window.addEventListener('keydown', self.onKeyDown)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', self.onKeyDown)
    }
}
</script>

<style lang="scss" scoped>
.c-drop-shape {
    width: 100%;
    height: 65%;
    position: relative;
}
</style>