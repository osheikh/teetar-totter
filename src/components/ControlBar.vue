<template>
    <v-layout justify-center class="ma-4">
        <v-btn color="#592ef5" fab x-large dark @click="togglePause">
            <v-icon>{{pauseButton}}</v-icon>
        </v-btn>
    </v-layout>
</template>

<script>

import { mapMutations, mapState } from 'vuex'
// actions & constants
import { ON_TOGGLE_PAUSE } from '../services/storeService'

export default {
    name: 'c-control-bar',
    computed: {
        ...mapState({
            isPaused: state => state.isPaused
        }),
        pauseButton() {
            const self = this;
            return self.isPaused ? 'mdi-arrow-right-drop-circle-outline' : 'mdi-pause-circle'
        },
    },
    methods: {
        ...mapMutations({
            togglePause: ON_TOGGLE_PAUSE
        }),
    }
}
</script>
<style scoped lang="scss">
</style>