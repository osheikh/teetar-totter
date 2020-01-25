<template>
    <v-tooltip v-model="show" top>
        <template v-slot:activator="{ on }">
            <div :class="blockClassName"
                :style="blockInlineStyle"
                v-on="on"
                ref="shape">
            </div>
        </template>
        <span>{{ block.weight }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: "c-shape",
    props: {
        block: {
            type: Object,
            required: true
        },
        side: {
            type: Boolean
        },
        top: {
            type: Number
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        roundUp(number) {
            return Math.round(number * 100) / 100
        },
        getBlockBottomCoord() {
            const self = this;
            const domElement = self.$refs.shape;
            return domElement.getBoundingClientRect().bottom;
        }
    },
    computed: {
        blockClassName() {
            const self = this;
            const { type } = self.block;
            switch (type) {
                case 0:
                    return 'block-circle';
                case 1:
                    return 'block-triangle';
                case 2:
                    return 'block-rectangle'
            }
            return ''
        },
        blockInlineStyle() {
            const self = this;
            const { offset, type, height } = self.block;
            const { side, roundUp, top } = self;
            const topOffset = top || 0;
            const leftOffset = side ? 50 + offset * 10 : 50 - offset * 10;
            const blockHeight = type !== 1 ?
                {
                    height: `${roundUp(height)}px`,
                    width: `${roundUp(height)}px`,
                    lineHeight: `${roundUp(height)}px`
                }
                :
                {
                    borderWidth: `0 ${roundUp(height)}px ${roundUp(height)}px ${roundUp(height / 2)}px`,
                    lineHeight: `${roundUp(height * 1.2)}px`
                };
            return {
                top: `${topOffset}px`,
                left: `${leftOffset}%`,
                ...blockHeight
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.block-circle, .block-rectangle, .block-triangle {
    position: absolute;
    transform: translate(-50%, -100%);
    text-align: center;
}
.block-circle {
    background-color: #ebba16;
    border-radius: 50%;
}
.block-triangle {
    width: 0;
    height: 0;
    line-height: 4rem;
    border-style: solid;
    border-color: transparent transparent #4caf50 transparent
}

.block-rectangle {
    background-color: #27cfc3;
}
</style>