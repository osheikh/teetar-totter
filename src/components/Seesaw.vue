<template>
    <section class="c-seesaw">
        <c-swing-bar></c-swing-bar>
        <c-fulcrum></c-fulcrum>
    </section>
</template>

<script>

// components
import SwingBar from './SwingBar'
import Fulcrum from './Fulcrum'

export default {
    name: "c-seesaw",
    components: {
        cSwingBar: SwingBar, 
        cFulcrum: Fulcrum,
    }
}
</script>

<style scoped>
.c-seesaw {
    height: 35%;
    width: 100%;
}
</style>