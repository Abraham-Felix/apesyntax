<style scoped>


</style>

<template>

<div id="app">
    <div class="panel-heading">
        <h2 class="panel-title">Write a message</h2>
    </div>
    <div>
        <form id="form" class="form-inline" v-on:submit.prevent="addMessage">
            <div class="form-group">
                <v-text-field :rules="nameRules" required label="First" type="text" id="messageFirst" class="form-control" v-model="newMessage.first">
                </v-text-field>
            </div>
            <div class="form-group">
                <v-text-field :rules="nameRules" required label="Last" type="text" id="messageLast" class="form-control" v-model="newMessage.last">
                </v-text-field>
            </div>
            <div class="form-group">
                <v-text-field :rules="emailRules" required label="Email" type="text" id="messageEmail" class="form-control" v-model="newMessage.email">
                </v-text-field>
            </div>
            <div class="form-group">
                <v-textarea :rules="contentRules" required label="Message" type="text" id="messageContent" class="form-control" v-model="newMessage.content">
                </v-textarea>
            </div>
            <v-btn @click="markcompleted" type="submit" small color="primary" dark>
                {{ displayText }}
            </v-btn>
        </form>
    </div>
</div>

</template>

<script>

import firebase from '../plugins/firebase'

import toastr from 'toastr';


let db = firebase.database();

let messagesRef = db.ref('contact-messages');

export default {
    name: 'contactform',

    firebase: {
        messages: messagesRef
    },

    data() {
        return {
            displayText: 'Push me!',
            newMessage: {
                first: '',
                content: '',
                email: '',
                last: '',
            },
            nameRules: [
                v => !!v || 'you must type something',
                v => v.length <= 10 || 'hum.. this monk smelling somthing strange... must be less than 10 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'Please enter a valid email containing @ ',
            ],
            contentRules: [
                v => !!v || 'Content is required amigo!'
            ],
        }
    },

    methods: {
        addMessage: function() {
            messagesRef.push(this.newMessage);
            this.newMessage.first = '';
            this.newMessage.last = '';
            this.newMessage.content = '';
            this.newMessage.email = '';
            toastr.success('Horray! message sent successfully');
            this.displayText = 'Nice job!';
            this.nameRules = true;
            this.emailRules = true;
            this.contentRules = true;
        },
        markcompleted: function() {
            this.displayText = 'hum.. somthing still missing';
        }
    },

}

</script>
