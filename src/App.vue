<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Apesyntax logo"
          class="shrink mr-2"
          contain
          src="https://celfonica.s3-us-west-1.amazonaws.com/logos/apesyntax+logo.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Apesyntax Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://celfonica.s3-us-west-1.amazonaws.com/logos/Apesyntax+name+white.png"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
    <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        class=" white--text text-center"
        color="primary"
        width="100%"
      >
        <v-card-text>
          <v-btn
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon class="mx-4 white--text" size="24px">mdi-google-hangouts</v-icon>
          </v-btn>

          <v-btn
            :key="icon"
            class="mx-4 white--text"
            icon
            href="https//www.github.com/abraham-felix"
          >
            <v-icon class="mx-4 white--text" size="24px">mdi-github</v-icon>
          </v-btn>



        </v-card-text>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Apesyntax</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
