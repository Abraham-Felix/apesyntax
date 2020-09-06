<style scoped>

img.preview {
    width: 200px;
}
button {
  box-shadow: 0px 0px 3px -2px #b6bbc0 ;
  color:white;
  padding:.5vh;
  border-radius: 10px;
  margin:2vh;
}
.v-btn {
    height: 50px !important;
    min-width: 50px !important;
}

.v-card {
    margin-top: 10vw;
    margin-bottom: 10vw;
    height: auto;
    padding: 2vh;
    max-width: 600px !important;
    width: auto;
    -webkit-box-pack: center;
}

.block {
    display: block!important;
}

.uid {
  font-size: 12px;
}
</style>

<template>

<div id="app">
    <v-container>
        <v-card class="center block">
          <v-text-field readonly v-model="uid" label="Uid">
          </v-text-field>
            <img :src="authUser.photoURL" width="150">
            <p>What's up, {{authUser.displayName || 'my friend'}}  I know you like {{authUser.favoriteFood || 'food'}}</p>
             <br>
             <v-icon color=green v-if="linkedGoogle" >mdi-google</v-icon>
             <v-icon color=green v-if="linkedPassword"> mdi-email-check</v-icon>
             <v-divider class="m-tb-20"></v-divider>

            <form  @submit.prevent="updateProfile">
              <h4>Update Profile</h4>
              <br>
              <div>
              <input  class="form-control" v-model="displayName" placeholder="your name"><br>
              <input class="form-control" v-model="photoURL" placeholder="your photo url">
              </div>
              <v-btn depressed small color="primary" @keyup.enter="updateProfile"> update </v-btn>
            </form>

            <form  @submit.prevent="updateEmail">
              <h4>Update email</h4>
              <br>
              <input type="email" class="form-control" v-model="email" placeholder="enter new email">
              <v-btn depressed small color="primary" @keyup.enter="updateEmail"> update </v-btn>
            </form>

            <form  @submit.prevent="updatePassword">
              <h4>Update password</h4>
              <br>
              <input type="password" class="form-control" v-model="newPassword" placeholder="enter new password">
              <v-btn depressed small color="primary" @keyup.enter="updatePassword"> update </v-btn>
            </form>

            <form  @submit.prevent="updateCustomDetails">
              <h4>Update extra details</h4>
              <br>
              <input type="text" v-model="usersDetails.favoriteFood" label="Fav language" placeholder="enter favorite programing language" class="form-control">
              <v-btn type="submit" depressed small color="primary" @keyup.enter="updateCustomDetails"> update </v-btn>
            </form>

            <div v-if="!linkedGoogle">
             <h4>Link google account</h4>
             <v-btn  @click="linkGoogle"><v-icon>mdi-google</v-icon></v-btn>
            </div>

            <div v-if="linkedGoogle">
             <h4>unlink google account</h4>
             <v-btn @click="unlinkGoogle"><v-icon color=red>mdi-email-off</v-icon></v-btn>
            </div>

        </v-card>
    </v-container>
</div>

</template>

<script>
import firebase from 'firebase';
import toastr from 'toastr';
let config = {
    apiKey: "AIzaSyAt7e2pEhvHg9ea5qpG7pOReSh_xFnAYOI",
    authDomain: "apesyntax.firebaseapp.com",
    databaseURL: "https://apesyntax.firebaseio.com",
    projectId: "apesyntax",
    storageBucket: "apesyntax.appspot.com",
    messagingSenderId: "970915545e858",
    appId: "1:970915545858:web:e9b093968d646dc8e0781b",
    measurementId: "G-15YM4ZEF9V"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
let db = firebase.database();
let messagesRef = db.ref('tutorials');
let usersRef = db.ref('users');
export default {
    name: 'profile',
    firebase: {
        tutorials: messagesRef
    },
    data() {
        return {
            email: '',
            displayName: '',
            uid: '',
            newPassword: '',
            providerData: '',
            authUser: '',
            usersDetails: {
              favoriteFood: '',
              userID:'',
            },
        }
    },
    computed:{
      linkedGoogle () {
        return !!this.authUser.providerData.find(provider => provider.providerId === 'google.com')
      },
      linkedPassword () {
        return !!this.authUser.providerData.find(provider => provider.providerId === 'password')
      }
    },
    methods: {
      updateProfile() {
        this.authUser.updateProfile({
          displayName: this.displayName ,
          photoURL: this.photoURL
        }); toastr.success('Nice! profile updated')
      },
      updateEmail() {
        this.authUser.updateEmail(this.email)
        toastr.success('Cool! email updated')
      },
      updateCustomDetails: function() {

        usersRef.push(this.usersDetails);
        this.usersDetails.favoriteFood= '';
        this.usersDetails.userID= '' ;
        toastr.success('Nice! extra details updated');
      },
      updatePassword() {
        this.authUser.updatePassword(this.newPassword)
        .then(() => { this.newPassword = null })
        .catch(err =>
            alert('Oops.' + err.message))
            toastr.success('Wow! password updated')
      },
      linkGoogle: function(){
        const provider = new firebase.auth.GoogleAuthProvider()
        this.authUser.linkWithPopup(provider)
      },
      unlinkGoogle: function(){
        this.authUser.unlink('google.com')
      },
    },
    created: function() {
        // functions
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
          uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
        }
          this.usersDetails.userID= uid;
        data => console.log(data.user, data.credential.accessToken)
        firebase.auth().onAuthStateChanged(user => {
            this.authUser = user
            if (user) {
                this.displayName = user.displayName
                this.photoURL = user.photoURL
                this.email = user.email
                this.uid = user.uid
                this.providerData = user.providerData

            }
        })

    }
}

</script>
