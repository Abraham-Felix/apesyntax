<template>
  <body>
  <v-card class="center">
   <div class="login">
    <h3>Sign In</h3>
    <br>
    <p>Welcome, sign in!</p>
    <input type="text" placeholder="Email"><br>
    <input type="password" placeholder="Password"><br>
    <button @click="login">Connection</button>
    <p>You don't have an account? you can <router-link to="/sign-up">create one.</router-link></p>
    </div>
  </v-card>
</body>
</template>

<script>
  export default {
  name: 'login',
  data() {
    return {};
  },
  methods: {
    login: function() {
        this.$router.replace('home');
    }
   }
  }
</script>

<style scoped>
 .v-card {
   margin: 10vw;
   height: 400px;
   padding: 2vh;
   max-width: 600px !important;
   width: min-content;
 }
 button {
   box-shadow: 0px 0px 3px -2px #b6bbc0 ;
   background: #b6bbc0;
   color:white;
   padding:.5vh;
   border-radius: 10px;
   margin:2vh;
 }
</style>
