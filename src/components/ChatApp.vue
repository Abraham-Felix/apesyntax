<style>



</style>

<template>

<div id="app">
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn style="z-index:9;" color="orange darken-5" dark rounded v-bind="attrs" v-on="on" class="m-tb-20" fixed right>
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon fab dark v-bind="attrs" v-on="on">
                            mdi-chat
                        </v-icon>

                    </template>
                    <img class="monk-ico" src="https://celfonica.s3-us-west-1.amazonaws.com/logos/monk-circle+50px.png">
                    <span style="display:inline;">

                      </span>
                </v-tooltip>
            </v-btn>
        </template>
        <div class="left">
            <v-btn color="primary" @click="dialog = false" width="10px">
                <v-icon>
                    mdi-close
                </v-icon>
            </v-btn>
            <div id="chat" class="container">
              <h1>Vue School Chat Room</h1>
              <!-- Messages -->
              <div v-bind:key="message" v-for="message in messages" class="card">
                <v-card padding="10px" class="pt-3 m-tb-20">

                  <!-- nickname -->
                  <h4 class="card-subtitle mb-2 ml-3 text-muted">{{ message.nickname }}</h4>
                  <!-- content -->
                  <p v-if="message !== editingMessage" class="card-text ml-3 ">{{ message.text }}</p>
                  <v-textarea v-else v-model="messageText" class="form-control"></v-textarea>
                  <!-- actions -->
                  <div v-if="message !== editingMessage">
                    <v-divider></v-divider>
                    <a @click.prevent="deleteMessage(message)" href="#" class="card-link"><v-icon color=red>mdi-delete</v-icon></a>
                    <a @click.prevent="editMessage(message)" href="#" class="card-link"><v-icon color=orange>mdi-pencil</v-icon></a>
                  </div>
                  <div v-else>

                    <a @click.prevent="cancelEditing" href="#" class="card-link"><v-icon color=red>mdi-cancel</v-icon></a>
                    <a @click.prevent="updateMessage" href="#" class="card-link"><v-icon color=green>mdi-pencil</v-icon></a>
                  </div>
                </v-card>
              </div>

              <!-- New Message -->
            <v-card hover  class="m-tb-20 pl-3 pr-3">
              <form  v-if="!editingMessage" @submit.prevent="storeMessage">
                <div class="form-group">
                  <h4>Chat App</h4>
                  <v-textarea label="Message" v-model="messageText" class="form-control"></v-textarea>
                </div>
                <div class="form-group">
                  <v-text-field label="Nickname" type="input" v-model="nickname" class="form-control">
                  </v-text-field>
                </div>
                <v-btn type="submit" class="m-tb-20 btn btn-primary"><v-icon color=primary>mdi-send</v-icon></v-btn>
              </form>
            </v-card>

              <!-- New Message
              <v-card hover class="m-tb-20 pl-3 pr-3">
              <form v-if="!editingMessage" @submit.prevent="storeMessage">
                <div class="form-group">
                  <h4>Chat App</h4>
                  <v-textarea label="Message" v-model="messageText" class="form-control"></v-textarea>
                </div>
                <div class="form-group">
                  <v-text-field label="Nickname" type="input" v-model="nickname" class="form-control">
                  </v-text-field>
                </div>
                <v-btn type="submit" class="m-tb-20 btn btn-primary"><v-icon color=primary>mdi-send</v-icon></v-btn>
              </form>
            </v-card> -->
            </div>
        </div>
    </v-dialog>
</div>
</template>

<script>
import nativeToast from 'native-toast'
import firebase from '../plugins/firebase'

//puts app name
//console.log(firebase.name);
//puts db reference
//console.log(firebase.database());

let db = firebase.database();
let messagesRef = db.ref('support-chat');
//line beneath gets us a console log of our db ref value to analize
db.ref('support-chat')/*,.on('value' snapshot => console.log(snapshot.val()));*/


export default {
    name: 'ChatApp',
    data() {
        return {
            dialog: false, // this for modal
            messages: [],
            messageText: '',
            nickname: 'Apesyntax',
            editingMessage: null
        }
    },
    methods: {
        storeMessage() {
                messagesRef.push({
                    text: this.messageText,
                    nickname: this.nickname
                })
                this.messageText = ''
            },
            deleteMessage(message) {
                messagesRef.child(message.id).remove()
            },
            editMessage(message) {
                this.editingMessage = message
                this.messageText = message.text
            },
            cancelEditing() {
                this.editingMessage = null
                this.messageText = ''
            },
            updateMessage() {
                messagesRef.child(this.editingMessage.id).update({
                    text: this.messageText
                })
                this.cancelEditing()
            }
    },

    created() {
        // value = snapshot.val() | key = snapshot.key
        messagesRef.on('child_added', snapshot => {
            this.messages.push({...snapshot.val(), id: snapshot.key
            })
            if (snapshot.val().nickname !== this.nickname) {
                nativeToast({
                    message: `New message by ${snapshot.val().nickname}`,
                    type: 'success'
                })
            }
        })
        messagesRef.on('child_removed', snapshot => {
            const deletedMessage = this.messages.find(message => message.id === snapshot.key)
            const index = this.messages.indexOf(deletedMessage)
            this.messages.splice(index, 1)
            if (snapshot.val().nickname !== this.nickname) {
                nativeToast({
                    message: `Message deleted by ${snapshot.val().nickname}`,
                    type: 'warning'
                })
            }
        })
        messagesRef.on('child_changed', snapshot => {
            const updatedMessage = this.messages.find(message => message.id === snapshot.key)
            updatedMessage.text = snapshot.val().text
            if (snapshot.val().nickname !== this.nickname) {
                nativeToast({
                    message: `Message edited by ${snapshot.val().nickname}`,
                    type: 'info'
                })
            }
        })
    },
  }

</script>
