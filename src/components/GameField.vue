<template>
    <main class="c-game-field">
        <c-game-stats></c-game-stats>
        <c-drop-shape></c-drop-shape>
        <c-seesaw></c-seesaw>
    </main>
</template>

<script>

// components
import DropShape from './DropShape'
import Seesaw from './Seesaw'
import GameStats from './GameStats'

export default {
    name: "c-game-field",
    components:{
        cGameStats: GameStats,
        cDropShape: DropShape, 
        cSeesaw: Seesaw
    }
}
</script>

<style lang="scss" scoped>
.c-game-field {
    width: 80%;
    height: 75%;
    margin: 20px auto;
    padding-top: 1rem;
    border-radius: 10px;
    padding: 20px;
}
</style>