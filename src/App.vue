<template>

<v-app>
<!-- it might need more height in body as content so it works properly -->
<v-parallax
    height="100%"

  >
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
  <!-- navbar -->
    <div id="nav">
      <v-app-bar
        app
        color="primary"
        dark
      >
        <div class="d-flex align-center nav-col-left">
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
        <div class="nav-col-mid">
        <router-link to="/about">
        <v-btn depressed small color="primary">About</v-btn>
        </router-link>
        <router-link to="/contact">
        <v-btn depressed dark small color="primary">Contact</v-btn>
        </router-link>
        <router-link to="/tutorials">
        <v-btn depressed dark small color="primary">Tutorials</v-btn>
        </router-link>

        </div>
        <div class="nav-col-right">
        </div>

        <v-spacer></v-spacer>
        <v-menu
        v-if="user.loggedIn"
     transition="slide-y-transition"
     bottom
   >
     <template v-slot:activator="{ on, attrs }">
       <v-btn
         class="purple"
         color="primary"
         dark
         v-bind="attrs"
         v-on="on"
       >
         <v-icon>mdi-account</v-icon>
       </v-btn>
     </template>
     <v-list>
       <v-list-item
         v-for="(item, i) in items"
         :key="i"
       >
       <a
            :href="item.url"
            :target="item.target">
         <v-list-item-title >{{ item.title }}
         </v-list-item-title>
       </a>
       </v-list-item>
       <v-list-item
       @click="logout"
       >Logout
     </v-list-item>
     </v-list>
   </v-menu>
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
          {{ new Date().getFullYear() }} — <strong>Apesyntax | My School project for Vue.js </strong>
        </v-card-text>

    </v-footer>
  </div>
  </v-parallax>
  </v-app>
</template>
<script>
import firebase from 'firebase'
import { mapGetters } from "vuex"

export default {
  name: 'App',
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    })
  },
data: () => ({
  items: [
        {
          title: "Profile",
          url: "/profile",
          active: true,
        }
      ],
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
  ],
}),
methods: {
  logout: function() {
    firebase.auth().signOut()
    .then(() => {
      this.$router.replace('login')
    })
  },

},


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
.nav-col-mid {
  width:60%;
  display: table;
}
.nav-col-left, .nav-col-right {
  width:20%;
}
// iphone6/7/8/9/x/+/S
@media only screen and (max-width: 400px){
    .v-parallax__content {
       padding:0px !important;
       transition: 1s;
       }
}
</style>
