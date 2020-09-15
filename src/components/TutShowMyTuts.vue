<style>
.content {
  text-align: justify;
padding: 20px;
}
</style>
<template>
  <v-container id="my-tutorials">
    <v-card>
      <h1>My Tutorials</h1>
    </v-card>

      <!-- loop over the tutorials -->
      <div v-for="(tutorial, key) in authUser.myTutorial" :key="key">
        <v-card>
             <br>
             <h3>{{ tutorial.title}}</h3><br>
             <div class="data-rw dt-corner">
               <v-icon> mdi-calendar </v-icon>
               <p> {{ tutorial.date  }} </p><br>
             </div>
             <p class="content"> {{ tutorial.content}}</p><br>
             <br>
             <img class="preview" :src="tutorial.picture"><br>
             <div class="data-rw"><v-icon>mdi-account-tie</v-icon>
               <p> {{ tutorial.first + ' ' + tutorial.last}}</p>
             </div>
             <br><br>
              <div class="data-rw"><v-icon>mdi-code-braces</v-icon>
                <a  v-bind:href="tutorial.code"> {{ tutorial.code }} </a>
              </div>
             <p> {{ tutorial.language  }} </p><br>
           <!-- and so on -->
        </v-card>
      </div>

  </v-container>
</template>

<script>

import firebase from '../plugins/firebase'
import vue from 'vue'

let db = firebase.database();
//let usersRef = db.ref('users');
let tutRef = db.ref('tutorials');

export default {
  name: 'TutShowMyTuts',
  data() {
      return {
          authUser: {},
          favoriteFood: null,
          myTutorial: null
      }
  },
  methods: {
  },
  created: function() {
    data => console.log(data.user, data.credential.accessToken)
    firebase.auth().onAuthStateChanged(user => {
        this.authUser = user
        if (user) {
          //usersRef.child(user.uid).once('value', snapshot => {
          //  if (snapshot.val()) {
          //  this.favoriteFood = snapshot.val().favoriteFood
        //    vue.set(this.authUser, 'favoriteFood', this.favoriteFood)
        //     }
        //  })
          tutRef.child(user.uid).once('value', snapshot => {
            if (snapshot.val()) {
            this.myTutorial = snapshot.val()
            vue.set(this.authUser, 'myTutorial', this.myTutorial )
             }
          });
        }

     })
   }
}
</script>
