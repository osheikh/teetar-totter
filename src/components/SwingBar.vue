<template>
    <div class="c-swing-bar" :style="inlineStyleSwing">
        <c-shape v-for="block in leftSideBlocks"
               :block="block"
               :key="block.id"></c-shape>
        <c-shape v-for="block in rightSideBlocks"
               :block="block"
               :side="true"
               :key="block.id"></c-shape>
    </div>
</template>

<script>

// modules
import { mapState, mapMutations } from 'vuex'

// components
import Shape from './Shape'

// actions & constants
import { ON_ADD_RIGHT_SIDE_BLOCK } from '../services/storeService'

export default {
    name: "c-swing-bar",
    components: {
        cShape: Shape
    },
    computed: {
        ...mapState([
            'rightSideBlocks',
            'leftSideBlocks'
        ]),
        swingBending() {
            const self = this;
            return self.$store.getters.swingBending
        },
        inlineStyleSwing() {
            const self = this;
            return {
                transform: `rotate(${self.swingBending / 2}deg)`
            }
        }
    },
    methods: {
        ...mapMutations({
            addRightBlock: ON_ADD_RIGHT_SIDE_BLOCK,
        })
    },
    beforeMount() {
        const self = this;
        self.addRightBlock()
    }
}
</script>

<style lang="scss" scoped>
.c-swing-bar {
    width: 100%;
    height: 0.5rem;
    background-color:#592ef5;
    position: relative;
    transform: rotate(0deg);
    transition: transform 0.4s ease-in-out;
}
</style>