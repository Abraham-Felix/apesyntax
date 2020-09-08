<style>



</style>

<template>

<div id="app">
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn style="z-index:9;" color="orange darken-5" dark rounded v-bind="attrs" v-on="on" fixed right>
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
                <div class="card-body">
                  <!-- nickname -->
                  <h6 class="card-subtitle mb-2 text-muted">{{ message.nickname }}</h6>
                  <!-- content -->
                  <p v-if="message !== editingMessage" class="card-text">{{ message.text }}</p>
                  <textarea v-else v-model="messageText" class="form-control"></textarea>
                  <!-- actions -->
                  <div v-if="message !== editingMessage">
                    <a @click.prevent="deleteMessage(message)" href="#" class="card-link">delete</a>
                    <a @click.prevent="editMessage(message)" href="#" class="card-link">edit</a>
                  </div>
                  <div v-else>
                    <a @click.prevent="cancelEditing" href="#" class="card-link">cancel</a>
                    <a @click.prevent="updateMessage" href="#" class="card-link">update</a>
                  </div>
                </div>
              </div>
              <hr>
              <!-- New Message -->
              <form v-if="!editingMessage" @submit.prevent="storeMessage">
                <div class="form-group">
                  <label>Message:</label>
                  <textarea v-model="messageText" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <label>Nickname:</label>
                  <input v-model="nickname" class="form-control"/>
                </div>
                <button class="btn btn-primary">Send</button>
              </form>

              <hr>
              <!-- New Message -->
              <form v-if="!editingMessage" @submit.prevent="storeMessage">
                <div class="form-group">
                  <label>Message:</label>
                  <textarea v-model="messageText" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <label>Nickname:</label>
                  <input v-model="nickname" class="form-control"/>
                </div>
                <button class="btn btn-primary">Send</button>
              </form>
            </div>
        </div>
    </v-dialog>
</div>
</template>

<script>
import nativeToast from 'native-toast'
import firebase from '../plugins/firebase'


console.log(firebase.name);
console.log(firebase.database());

let db = firebase.database();
let messagesRef = db.ref('support-chat');


export default {
    name: 'ChatApp',
    data() {
        return {
            dialog: false, // this for modal
            messages: [],
            messageText: '',
            nickname: 'hootlex',
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
