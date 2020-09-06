<style scoped>
img.preview {
  width:200px;
}
.v-btn {
    height: 50px !important;
    min-width: 50px !important;
}
.v-card {
    margin-top: 10vw;
    margin-bottom: 10vw;
    height: 400px;
    padding: 2vh;
    max-width: 600px !important;
    width: 300px;
    -webkit-box-pack: center;
}
</style>
<template>
   <div id="app">
     <v-container>
     <v-card>
          <v-icon> mdi-shield-account</v-icon>
          <v-simple-text  class="mb-10"> {{ uid }} </v-simple-text>
   </v-card>
 </v-container>
    </div>
</template>
<script>

import Firebase from 'firebase';



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
if (!Firebase.apps.length) {
    Firebase.initializeApp(config);
}
let db = Firebase.database();
let messagesRef = db.ref('tutorials');
var user = Firebase.auth().currentUser;
var uid;
if (user != null) {
  uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}
export default {
    name: 'profile',
    firebase: {
        tutorials: messagesRef
    },
    data() {
        return {
          uid,
    }
    },
    methods: {
      loadUid: function(){
        uid;
      }
    },
    beforeCreated: function(){
    this.$nextTick(this.loadUid)
}
  }
</script>
