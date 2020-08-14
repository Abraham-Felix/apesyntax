<template>
<v-app>
/*   <!-- navbar -->
    <div id="nav">
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

        <button @click="logout">Logout</button>

        <v-spacer></v-spacer>
        <router-link to="/home">Home</router-link> |
        <router-link to="/about">About</router-link>


        </v-app-bar>
      </div>

     <!-- body -->
      <div id="body">
        <main>
          <router-view/>
        </main>
     </div>

    <!-- footer -->
    <div id="footer">
    <v-footer
      dark
      padless
        flat
        tile
        class=" white--text text-center"
        color="primary"
        width="100%"
      >
        <v-card-text>
          <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3 "
          dark
          icon
        >
          <a :href="icon.url" :target="icon.target">
            <v-icon class="white--text" size="24px">{{ icon.name }}</v-icon>
          </a>
        </v-btn>
        </v-card-text>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Apesyntax</strong>
        </v-card-text>

    </v-footer>
  </div>
  </v-app>
</template>
<script>

import firebase from 'firebase';


export default {
  name: 'home',
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
data: () => ({
  icons: [
    {
        name:'mdi-google',
        url: 'https://business.google.com/dashboard/l/18315130497288576188',
        target: '_blank'
    },
    {
        name:'mdi-github',
        url: 'https://www.github.com/abraham-felix',
        target: '_blank'
    },
  ]
})
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
