<style scoped>

.v-btn {
    height: 50px !important;
    min-width: 50px !important;
}

</style>

<template>

<div id="app">
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn style="z-index:9;" color="blue lighten-1" dark rounded v-bind="attrs" v-on="on" fixed left>
                <v-tooltip right >
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon fab dark v-bind="attrs" v-on="on">
                            mdi-plus
                        </v-icon>
                    </template>
                    <img class="monk-ico" src="https://celfonica.s3-us-west-1.amazonaws.com/logos/monk-circle+50px.png">
                    <span style="display:inline;">
                      Add Tutorial
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
        </div>
        <div class="panel-heading">
        </div>
        <div>
            <h1>Tutorial form</h1>
            <h3> create one</h3>
            <form id="form" class="form-inline" v-on:submit.prevent="addTutorial">
                <v-divider class="m-tb-20"></v-divider>
                <h4>Author details</h4>
                <div class="form-group">
                    <v-text-field :rules="nameRules" required label="First Name" type="text" id="tutorialFirst" class="form-control" v-model="newTutorial.first">
                    </v-text-field>
                </div>
                <div class="form-group">
                    <v-text-field :rules="nameRules" required label="Last Name" type="text" id="tutorialLast" class="form-control" v-model="newTutorial.last">
                    </v-text-field>
                </div>
                <div class="form-group">
                    <v-text-field :rules="emailRules" required label="Email" type="text" id="tutorialEmail" class="form-control" v-model="newTutorial.email">
                    </v-text-field>
                </div>

                <v-divider class="m-tb-20"></v-divider>
                <h4>Tutorial content</h4>
                <div class="form-group">
                    <v-select required label="Language" id="tutorialLanguage" v-model="newTutorial.language" multiple type="text" autocomplete tags :items="languages" class="form-control">
                        <template slot="selection" slot-scope="data">
                            <v-btn>
                                {{ data.item }}
                            </v-btn>
                        </template>
                    </v-select>
                </div>
                <div class="form-group">
                    <v-text-field :rules="titleRules" required label="Tutorial Title" type="text" id="tutorialTitle" class="form-control" v-model="newTutorial.title">
                    </v-text-field>
                </div>
                <div class="form-group">
                    <v-textarea :rules="contentRules" required label="Tutorial content" type="text" id="tutorialContent" class="form-control" v-model="newTutorial.content">
                    </v-textarea>
                </div>
                <div class="form-group">
                  <v-text-field required label="Date" class="form-control" type='date' v-model='newTutorial.date'>
                  </v-text-field>
                </div>
                <v-divider class="m-tb-20"></v-divider>
                <h4> Preview </h4>
                <v-card class="m-tb-20" v-model="newTutorial">

                        <v-card-title>{{ newTutorial.title }} </v-card-title>

                            <v-card-subtitle> {{ newTutorial.first }} {{ newTutorial.last }} </v-card-subtitle>
                        <v-divider class="m-tb-20"></v-divider>
                        <v-card-text>{{ newTutorial.content }}</v-card-text>

                         <v-card-text >
                           <h5>{{ newTutorial.language }}</h5>
                           <h5>{{ newTutorial.email }}</h5>
                           <h5>{{ newTutorial.date }}</h5>
                         </v-card-text>

                </v-card>
                <v-btn class="m-tb-20" @click="markcompleted" type="submit" small color="primary" dark>
                    {{ displayText }}
                </v-btn>
            </form>
        </div>
    </v-dialog>
</div>

</template>

<script>

import Firebase from 'firebase';

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
if (!Firebase.apps.length) {
    Firebase.initializeApp(config);
}

let db = Firebase.database();

let messagesRef = db.ref('tutorials');

export default {
    name: 'tutform',

    firebase: {
        tutorials: messagesRef
    },

    data() {
        return {
            dialog: false,
            displayText: 'Push me!',
            newTutorial: {
                first: '',
                content: '',
                email: '',
                last: '',
                language: '',
                title: '',
                date:'',
            },
            languages: [
                'Html', 'Css', 'Vue', 'Ruby', 'Js', 'Sass', 'Other'
            ],
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
            titleRules: [
                v => !!v || 'Tittle is required buddy!',
                v => v.length <= 100 || 'Woots!, Lets try making this one shorter'
            ]
        }
    },

    methods: {
        addTutorial: function() {
            messagesRef.push(this.newTutorial);
            this.newTutorial.first = '';
            this.newTutorial.last = '';
            this.newTutorial.content = '';
            this.newTutorial.email = '';
            this.newTutorial.language = '';
            this.newTutorial.title = '';
            this.newTutorial.date ='',
            toastr.success('Horray! message sent successfully');
            this.displayText = 'Nice job!';
            this.nameRules = true;
            this.emailRules = true;
            this.contentRules = true;
            this.titleRules = true;
        },
        markcompleted: function() {
            this.displayText = 'hum.. somthing still missing';
        }
    },

}

</script>
