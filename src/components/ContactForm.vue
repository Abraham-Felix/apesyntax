<template>
 <div id="app" class="contactForm">
   <div class="page-header">
       </div>
       <div class="panel panel-default">
         <div class="panel-heading">
           <h2 class="panel-title">write something cool...</h2>
           <p> maybe... </p>
         </div>
         <div class="panel-body">
            <form id="form" class="form-inline" v-on:submit.prevent="addMessage">
             <div class="form-group">
                <v-text-field required label="Name" type="text" id="messageName" class="form-control" v-model="newMessage.name">
                 </v-text-field>
             </div>
             <div class="form-group">
               <v-text-field :rules="emailRules" required label="email" type="text" id="messageEmail" class="form-control" v-model="newMessage.email">
               </v-text-field>
             </div>
             <div class="form-group">
               <v-textarea required label="Message" type="text" id="messageContent" class="form-control" v-model="newMessage.content">
               </v-textarea>
             </div>
             <v-btn type="submit" small color="primary" dark>
              Push me
             </v-btn>
           </form>
         </div>
       </div>
</div>
</template>
<script>

  import Firebase from 'firebase'

  import toastr from 'toastr'

  let config = {
    apiKey: "AIzaSyAt7e2pEhvHg9ea5qpG7pOReSh_xFnAYOI",
    authDomain: "apesyntax.firebaseapp.com",
    databaseURL: "https://apesyntax.firebaseio.com",
    projectId: "apesyntax",
    storageBucket: "apesyntax.appspot.com",
    messagingSenderId: "970915545858",
    appId: "1:970915545858:web:e9b093968d646dc8e0781b",
    measurementId: "G-15YM4ZEF9V"
  };

let app = Firebase.initializeApp(config)

  let db = app.database()

let messagesRef = db.ref('messages')

export default {
  name: 'contactform',

  firebase: {
  messages: messagesRef
},

data () {
  return {
    newMessage: {
        name: '',
        content: '',
        email: ''
    }
  }
},

 methods: {
    addMessage: function () {
      messagesRef.push(this.newMessage);
      this.newMessage.name = '';
      this.newMessage.content = '';
      this.newMessage.email = '';
      toastr.success('Horray! message sent successfully')
    },
  },

}

</script>

<style scoped>


</style>
