<template>
    <v-layout class="c-game-stats" justify-center>
        <flex>
            <v-card>
                <v-card-text>
                    <h4>left wing stats</h4>
                    <v-layout>
                        <v-flex>
                            Total Weight: <span>{{leftWeight || 0}}kg</span>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex>
                            Momentum (falling object): <span>{{leftBlockMomentum || 0}}kg m/s</span>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </flex>
        <v-flex xs6></v-flex>
        <flex>
            <v-card>
                <v-card-text>
                    <h4>Right wing stats</h4>
                    <v-layout>
                        <v-flex>
                            Total Weight: <span>{{rightWeight || 0}}kg</span>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex>
                            Momentum (falling object): <span>-</span>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </flex>
    </v-layout>
</template>

<script>

// modules
import { mapState } from 'vuex'

// util
import { getBlockWeight, getBlockMomentum } from "../services/utilService"

export default {
    name: "c-game-stats",
    computed: {
        ...mapState({
            leftBlockMomentum: state => {
                const currentFallingBlock = state.fallingBlocks.length ? state.fallingBlocks[0] : null;
                return getBlockMomentum(currentFallingBlock);
            },
            leftWeight: state => getBlockWeight(state.leftSideBlocks),
            rightWeight: state => getBlockWeight(state.rightSideBlocks)
        })
    }
}
</script>

<style lang="scss" scoped>
.c-game-stats {
}
</style>