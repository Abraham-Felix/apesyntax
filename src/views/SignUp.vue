<template>
<body>
<v-card class="center">
 <div class="sign-up">
 <h3> Sign up </h3>
 <br>
 <p>Let's create a new account!</p>
   <input type="text" v-model="email" placeholder="Email"><br>
   <input type="password" v-model="password" placeholder="Password"><br>
     <v-btn depressed small color="primary" @click="signUp">sign up</v-btn>
   <p>or go back to <router-link to="/login">login</router-link>.</p>
  </div>
  </v-card>
  </body>
</template>

<script>

import firebase from 'firebase';

  export default {
    name:  'signUp',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
      (user) => {
          this.$router.go('home' + user.message)
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
    width: 300px;
    -webkit-box-pack: center;
  }
  button {
    box-shadow: 0px 0px 3px -2px #b6bbc0 ;
    background: #b6bbc0;
    color:white;
    padding:.5vh;
    border-radius: 10px;
    margin:2vh;
  }
  .signUp {
      margin-top:40px;
    }
    span {
    display:block;
    margin-top: 20px;
    font-size: 11px;
    }
</style>
