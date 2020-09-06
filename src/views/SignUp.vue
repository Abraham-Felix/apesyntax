<template>
<body>

 <v-card v-if="authUser" class="center block">
 <h5> sign in as <p>{{authUser.email}} </p> </h5>
 <img :src="authUser.photoURL" width="150">
 <p>What's up, {{authUser.displayName || 'my friend? you can asign your self a name below'}} </p>
 <br>

</v-card>
 <v-card v-else class="center block">
   <h3> Sign up </h3>
   <form @submit.prevent="register" class="sign-up">
 <p>Let's create a new account!</p>
   <input type="text" v-model="email" placeholder="Email"><br>
   <input type="password"  @keyup.enter="register" v-model="password" placeholder="Password"><br>
     <v-btn depressed small color="primary" @click="register">sign up</v-btn>
   <p>or go back to <router-link to="/login">login</router-link>.</p>
  </form>
  <div>
  <h5>Sign in with Google</h5>
  <v-btn @click="signInWithGoogle"><v-icon>mdi-google</v-icon></v-btn>
 </div>
</v-card>
  </body>
</template>

<script>

import firebase from 'firebase';
import toastr from 'toastr';

  export default {
    name:  'signUp',
    data() {
      return {
        email: '',
        password: '',
        authUser: null
      }
    },
    methods: {
      register: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
      (user) => {
          this.$router.go('home' + user.message)
        } ,
       (err) => {
          alert('Oops.' + err.message)
        }
      );
    },
    signInWithGoogle: function(){
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
      .then(
        data => console.log(data.user, data.credential.accessToken)
      )
    },
    updateProfile() {
      this.authUser.updateProfile({
        displayName: this.displayName ,
        photoURL: this.photoURL
      }); toastr.success('Nice! profile updated')
    },
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      this.authUser = user
      if (user) {
        this.displayName = user.displayName
        this.photoURL = user.photoURL
        this.email = user.email
      }
    })
  },
}

</script>

  <style scoped>
  .v-card {
    margin: 10vw;
    height: auto;
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
  .block {
    display:block!important;
  }
</style>
