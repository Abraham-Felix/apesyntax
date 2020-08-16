import Vue from 'vue'
import firebase from 'firebase'

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

import './styles/app.css';

require('firebase/firestore')
Vue.config.productionTip = false;

let app = '';

var config = {
  apiKey: "AIzaSyAt7e2pEhvHg9ea5qpG7pOReSh_xFnAYOI",
  authDomain: "apesyntax.firebaseapp.com",
  databaseURL: "https://apesyntax.firebaseio.com",
  projectId: "apesyntax",
  storageBucket: "apesyntax.appspot.com",
  messagingSenderId: "970915545858",
  appId: "1:970915545858:web:e9b093968d646dc8e0781b",
  measurementId: "G-15YM4ZEF9V"
};

firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message
  });
}

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
