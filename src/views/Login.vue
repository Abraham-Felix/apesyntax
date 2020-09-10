<style scoped>
.oneH {
width:100%;
display:grid;
}

.v-card {
    margin: 10vw;
    height: 500px;
    padding: 2vh;
    max-width: 600px !important;
    width: 300px;
    -webkit-box-pack: center;
}

button {
    box-shadow: 0px 0px 3px -2px #b6bbc0;
    background: #b6bbc0;
    color: white;
    padding: .5vh;
    border-radius: 10px;
    margin: 2vh;
}
h5 {
  color: dodgerblue;
}
</style>

<template>

<v-form class="contactForm">
    <v-card class="center">
        <div class="login">
            <h3>Log In</h3>
            <br>
            <div class="form-group">
                <v-text-field class="form-control" type="text" v-model="email" placeholder="Email">
                </v-text-field>
            </div>
            <v-text-field class="form-control" type="password" @keyup.enter="login" v-model="password" placeholder="Password">
            </v-text-field>
            <v-btn depressed small color="primary"  @click="login">conect</v-btn>
            <p>Or you can
                <router-link to="/sign-up">create one.</router-link>
            </p>
            <div class="oneH">
            <div class="grid-50">
            <h5>Sign in with</h5>
            <v-btn @click="signInWithGoogle"><v-icon>mdi-google</v-icon></v-btn>
           <v-btn @click="signInWithGithub"><v-icon>mdi-github</v-icon></v-btn>
          </div>
          </div>

        </div>
    </v-card>
</v-form>

</template>

<script>

import firebase from 'firebase';
import toastr from 'toastr';

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
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(
                (user) => {
                    this.$router.go('home' + user.message + this.created || true)
                }, (err) => {
                    alert('Oops.' + err.message)
                }
            )
        },
        signInWithGoogle: function(){
          const provider = new firebase.auth.GoogleAuthProvider()
          firebase.auth().signInWithPopup(provider)
          .then(
              (user) => {
                  this.$router.go('home' + user.message + this.created || true)
                }, (err) => {
                  alert('Oops.' + err.message)
              }
          )
        },
        signInWithGithub: function(){
          const provider = new firebase.auth.GithubAuthProvider()
          firebase.auth().signInWithPopup(provider)
          .then(
              (user) => {
                  this.$router.go('home' + user.message + this.created || true)
                }
          )
          .catch (err =>
            toastr.error('Yikes! '+ err.message))
          .catch (
            toastr.success('Well done +'))
        },
    }
}

</script>
