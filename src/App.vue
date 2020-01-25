<template>
  <v-app>
    <v-app-bar
      app
      color="#592ef5"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2 transparent"
          contain
          src="./assets/insider_logo_2x.png"
          transition="scale-transition"
          width="90"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://useinsider.com/"
        target="_blank"
        text
      >
        <span class="mr-2">Explore</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
        <c-control-bar/>
        <c-game-field></c-game-field>
    </v-content>
  </v-app>
</template>

<script>
import ControlBar from './components/ControlBar';
import GameField from './components/GameField';

export default {
  name: 'App',
  components: {
    cControlBar: ControlBar,
    cGameField: GameField
  },
};
</script>
<style style="scss">
.transparent{
    filter: brightness(0) invert(1);
}
</style>
