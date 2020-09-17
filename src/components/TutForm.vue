<style scoped>
img.preview {
  width:200px;
}
.v-btn {
    height: 50px !important;
    min-width: 50px !important;
}

</style>

<template>

<div id="app">
    <v-dialog v-model="dialog" width="500">
        <template  v-slot:activator="{ on, attrs }">
            <v-btn style="z-index:9;" color="blue lighten-1" dark rounded v-bind="attrs" v-on="on" fixed left>
                <v-tooltip right >
                    <template  v-slot:activator="{ on, attrs }">
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
                <div class="form-goup">
                  <!-- Img upload input field-->
                  <div>
                    <h4 class="m-tb-20">Upload tutorial picture:</h4>
                  <input class="form-control"  type="file" @change="previewImage" accept="image/+">
                  <br><v-btn class="m-tb-20" @click=" onUpload();"><v-icon>mdi-upload</v-icon></v-btn>
                </div>
                <div>
                  <p> Progress: {{uploadValue.toFixed()+"%"}}
                    <progress :value="uploadValue" max="100"></progress>
                  </p>
                </div>
              </div>

                <v-divider class="m-tb-20"></v-divider>
                <h4>Tutorial content</h4>
                <div class="form-group">
                    <v-select required label="Language"
                    id="tutorialLanguage" v-model="newTutorial.language"
                    multiple type="text" autocomplete tags :items="languages" class="form-control">
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
  <!--tiptap-->   <v-card >
                  <div >
                    <editor-menu-bar v-on:submit.prevent="addTutorial" :editor="editor" v-slot="{ commands, isActive }">
                      <div>
                      <v-btn :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                      <v-icon class="mdi mdi-format-bold mdi-24px"> </v-icon>
                    </v-btn>
                      <v-btn :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                        <v-icon class="mdi mdi-format-italic mdi-24px "> </v-icon>
                      </v-btn>
                      <v-btn :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                        <v-icon class="mdi mdi-format-underline mdi-24px "> </v-icon>
                      </v-btn>
                      <v-btn :class="{ 'is-active': isActive.code() }" @click="commands.code">
                        <v-icon class="mdi mdi-code-tags mdi-24px "> </v-icon>
                      </v-btn>
                      <v-btn :class="{ 'is-active': isActive.link() }" @click="commands.link">
                        <v-icon class="mdi mdi-link mdi-24px"> </v-icon>
                      </v-btn>

                      <v-divider></v-divider>
                    </div>
                    </editor-menu-bar>
                    <editor-content  label="Tutorial content"  :editor="editor" v-model="newTutorial.content" />
                  </div>
                  </v-card>

                <div class="form-group">
                    <v-text-field required label="Date" class="form-control" type='date' v-model='newTutorial.date'>
                    </v-text-field>
                </div>
                <div class="form-group">
                    <v-text-field  required label="Tutorial Sample Code Link" type="url" id="tutorialCode" class="form-control" v-model="newTutorial.code">
                    </v-text-field>
                </div>

              <div>

                <br>

              </div>
                <v-divider class="m-tb-20"></v-divider>
                <h4> Preview </h4>
                <v-card class="m-tb-20" v-model="newTutorial">
                  <img class="preview " :src="picture"><br>
                    <v-card-title class="center">{{ newTutorial.title }} </v-card-title>
                    <v-card-subtitle> {{ newTutorial.first }} {{ newTutorial.last }} </v-card-subtitle>
                    <v-divider class="m-tb-20"></v-divider>
                    <v-card-text v-html="newTutorial.content">{{ newTutorial.content }}</v-card-text>
                    <v-card-text>
                        <h5>{{ newTutorial.language }}</h5>
                        <h5>{{ newTutorial.email }}</h5>
                        <h5>{{ newTutorial.date }}</h5>
                    </v-card-text>

                </v-card>

                <!-- Form push btn -->
                <v-btn class="m-tb-20" @click="markcompleted();" type="submit" small color="primary" dark>
                    {{ displayText }}
                </v-btn>
            </form>
        </div>
    </v-dialog>
</div>

</template>

<script>

import firebase from '../plugins/firebase'
import EditorContent from "../components/EditorContent";
import toastr from 'toastr';
// to debug multiple Fire apps
//if (!firebase.apps.length) {
//    firebase.initializeApp(config);
//    this.newTutorial.userID= uid;
//}
import { Editor,  EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

let db = firebase.database();

let messagesRef = db.ref('tutorials');
export default {
    name: 'tutform',
    firebase: {
        tutorials: messagesRef
    },
    components: {
      EditorMenuBar,
      EditorContent,
    },
    data() {
        return {
          editor: new Editor({
            extensions: [
              new Blockquote(),
              new CodeBlock(),
              new HardBreak(),
              new Heading({ levels: [1, 2, 3] }),
              new BulletList(),
              new OrderedList(),
              new ListItem(),
              new TodoItem(),
              new TodoList(),
              new Bold(),
              new Code(),
              new Italic(),
              new Link(),
              new Strike(),
              new Underline(),
              new History(),
            ],
            content: '',
            }),
            imageData:null,
            picture:null,
            uploadValue: 0,
            dialog: false,
            displayText: 'Push me!',
            newTutorial: {
                first: '',
                email: '',
                last: '',
                language: [],
                title: '',
                content: '',
                date: '',
                picture:'',
                code: '',
            },
            languages: [
                'Html', 'CSS', 'VUE', 'React', 'Ruby', 'JS', 'SASS', 'Python','PHP','C#','JAVA','Other',
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
        previewImage(event){
            this.uploadValue=0;
            this.picture=null;
            this.imageData=event.target.files[0];
        },
        onUpload() {
          this.picture=null;
          const storageRef=firebase.storage().ref(`tutorials/images/${this.imageData.name}`).put(this.imageData);
          storageRef.on(`state_changed`, snapshot=>{
            this.uploadValue=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture=url;
            this.newTutorial.picture = url;
            console.log(this.picture);
            toastr.success('Image Uploaded successfully');
          })}
        )
        },
        addTutorial: function() {
            messagesRef.child(this.newTutorial.userID).push(this.newTutorial);
            this.newTutorial.first = '';
            this.newTutorial.last = '';
            this.newTutorial.content = '';
            this.newTutorial.email = '';
            this.newTutorial.language = '';
            this.newTutorial.title = '';
            this.newTutorial.date = '',
            this.newTutorial.picture= '',
            this.newTutorial.code= '',
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
    // this functions trow in uid from user in data valu to {uid}
    created: function(){
      var user = firebase.auth().currentUser;
      var uid;
      if (user != null) {
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
                         // this value to authenticate with your backend server, if
                         // you have one. Use User.getToken() instead.
      }
      this.newTutorial.userID = uid;
    },
    beforeDestroy() {
      this.editor.destroy()
    }
}

</script>
