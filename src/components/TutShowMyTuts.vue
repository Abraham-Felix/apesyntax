<style scoped>
img.preview {
  width:200px;
}
.content {
  text-align: justify;
padding: 20px;
}
.v-card{
  margin-top:10px;
  margin-bottom:10px;
}
.v-btn {
    height: 50px !important;
    min-width: 50px !important;
}

</style>
<template>

    <v-dialog v-model="dialog" width="500">
        <template  v-slot:activator="{ on, attrs }">
            <v-btn style="z-index:9;" color="blue lighten-1" dark rounded v-bind="attrs" v-on="on" fixed right>
              <v-tooltip right >
                  <template  v-slot:activator="{ on, attrs }">
              <v-icon fab dark v-bind="attrs" v-on="on">
                  mdi-eye
              </v-icon>
            </template>
            <img class="monk-ico" src="https://celfonica.s3-us-west-1.amazonaws.com/logos/monk-circle+50px.png">
            <span style="display:inline;">
              View your tutorials
            </span>
        </v-tooltip>
            </v-btn>
            </template>
            <div class="left">
                <v-btn style="z-index:9; height: 20px !important; margin-top: -30px; margin-left: -10px;" color="primary" @click="dialog = false" width="5px">
                    <v-icon>
                        mdi-close
                    </v-icon>
                </v-btn>
            </div>
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
             <p class="content" v-html="tutorial.content"> {{ tutorial.content}}</p><br>
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
</v-dialog>
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
          myTutorial: null,
          dialog: false,
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
