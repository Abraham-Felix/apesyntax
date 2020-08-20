<template>
  <body>
  <v-card class="center">
   <div class="login">
    <h3>Sign In</h3>
    <br>
    <p>Welcome, sign in!</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login">Connection</button>
    <p>You don't have an account? you can <router-link to="/sign-up">create one.</router-link></p>
    </div>
  </v-card>
</body>
</template>



<script>

  import firebase from 'firebase';

  export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
      login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
      (user) => {
        this.$router.go('home' +  user.message + this.created || true)
      },
      (err) => {
        alert('Oops.' + err.message)
      }
     );
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
