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
.v-container {
  padding:0px !important;
}
.v-card {
    margin-top: 1vw;
    margin-bottom: 1vw;
    height: auto;
    padding: 1vw;
    max-width: 600px !important;
    width: auto;
    -webkit-box-pack: center;
}
@media only screen and (min-width:1000px){
  .v-card {
    width: 100% !important;
    max-width: 1000px !important;
  }
  form {
      width: 100%;
      display: table-cell !important;
      /* height: 117px; */
      box-shadow: 0px 0px 19px 4px #e6e8ec;
      border-radius: 10px;
      padding: 10px;
  }
}
@media ony screen and (max-width:1000px){
  .right-btn{
     float: right;
     position: relative;
     top: -10px;
     left: -125px;
}
form {
    padding: 10px;
    box-shadow: 0px 0px 10px 4px #e6e8ec;
    margin-top:20px;
    border-radius: 5px;
}
}
.authicons{
  margin-left:10px;
  marginright:10px;
}
.block {
    display: block!important;
}
.uid {
  font-size: 12px;
}
.update-profile-inputs{
display: inline-grid;
}
.update{
  height:28px !important;
  width:fill-available;
}
</style>

<template>

<div id="app">
    <v-container class="v-container">
        <v-card class="center block">
          <v-text-field readonly v-model="uid" label="Uid">
          </v-text-field>
            <img :src="authUser.photoURL" width="150">
            <p>What's up, {{authUser.displayName || 'my friend'}}  I know you like {{authUser.favoriteFood || 'food'}}</p>
             <br>
             <v-icon class="authicons" color=green v-if="linkedGoogle" >mdi-google</v-icon>
             <v-icon class="authicons" color=green v-if="linkedPassword"> mdi-email-check</v-icon>
             <v-divider class="m-tb-20"></v-divider>

            <form  @submit.prevent="updateProfile">
              <h4>Update Profile</h4>
              <br>
              <div class="update-profile-inputs">
              <input  class="form-control" v-model="displayName" placeholder="your name"><br>
              <input class="form-control" v-model="photoURL" placeholder="your photo url">
              </div>
              <v-btn depressed small color="primary" @keyup.enter="updateProfile" class="update right-btn"> update </v-btn>
            </form>

            <form  @submit.prevent="updateEmail">
              <h4>Update email</h4>
              <br>
              <input type="email" class="form-control" v-model="email" placeholder="enter new email">
              <v-btn depressed small color="primary" @keyup.enter="updateEmail" class="update"> update </v-btn>
            </form>

            <form  @submit.prevent="updatePassword">
              <h4>Update password</h4>
              <br>
              <input type="password" class="form-control" v-model="newPassword" placeholder="enter new password">
              <v-btn depressed small color="primary" @keyup.enter="updatePassword" class="update"> update </v-btn>
            </form>

            <form  @submit.prevent="updateCustomDetails">
              <h4>Update extra details</h4>
              <br>
              <input type="text" v-model="usersDetails.favoriteFood" label="Fav language" placeholder="enter favorite programing language" class="form-control">
              <v-btn type="submit" depressed small color="primary" @keyup.enter="updateCustomDetails" class="update"> update </v-btn>
            </form>
              <v-divider class="m-tb-20"></v-divider>
            <div class="center" v-if="!linkedGoogle">
              <br>
             <h4 class="center">Link google account</h4>
             <br>
             <v-btn class="center" @click="linkGoogle"><v-icon>mdi-google</v-icon></v-btn>
            </div>

            <div class="center" v-if="linkedGoogle">
             <br>
             <h4 class="center">unlink google account</h4>
             <br>
             <v-btn class="center" @click="unlinkGoogle"><v-icon color=red>mdi-email-off</v-icon></v-btn>
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
