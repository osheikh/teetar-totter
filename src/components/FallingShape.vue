<template>
    <div>
        <c-shape :block="block"
               :top="blockDropboxTop"
               ref="shape"
               :index="index"
               :isPaused="isPaused"
        />
    </div>
</template>

<script>

// components 
import Shape from './Shape'

// actions & constants
import { ON_FINISH_FALLING } from '../services/storeService'

import { TEETER_TOTTER_WIDTH, eventConstants } from '../services/constantsService'


export default {
    name: "c-falling-shape",
    props: {
        block: {
            type: Object,
            required: true
        },
        index: {
            type: Number
        },
        timeOut: {
            type: Number
        }
    },
    components: {
        cShape: Shape
    },
    data() {
        const self = this;
        return {
            blockWindowBottom: 0,
            blockDropboxTop: self.block.height,
            timer: 0
        }
    },
    computed: {
        isPaused() {
            const self = this;
            return self.$store.state.isPaused
        },
        swingBending() {
            const self = this;
            return self.$store.getters.swingBending
        },
        blockFinalPosition() {
            const self = this;
            const { top, bottom } = self.getSwingCoords();
            return self.swingBending >= 0 ? top + ((bottom - top) / 2) * (1 - self.block.offset / (TEETER_TOTTER_WIDTH / 2))
                : bottom - ((bottom - top) / 2) * (1 - self.block.offset / (TEETER_TOTTER_WIDTH / 2))
        }
    },
    methods: {
        getSwingCoords() {
            const { top, bottom } = document.querySelector('.c-swing-bar').getBoundingClientRect();
            return {
                top, bottom
            }
        },
        incrementBlockDropboxTop() {
            const self = this;
            self.blockDropboxTop += 20;
        }
    },
    updated() {
        const self = this;
        if (self.isPaused) {
            return clearTimeout(self.timer)
        }
        if (self.index !== 0) {
            return
        }
        self.blockWindowBottom = self.$refs.shape.getBlockBottomCoord();
        self.timer = setTimeout(() => {
            if (self.blockWindowBottom >= self.blockFinalPosition - 20) {
                clearTimeout(self.timer);
                self.$store.dispatch(ON_FINISH_FALLING);
                self.$emit(eventConstants.FINISHED_FALLING);
                return;
            }
            self.incrementBlockDropboxTop();
        }, self.timeOut)
    }
}
</script>