import Vue from 'vue'
import firebase from 'firebase'

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

import './styles/app.css';

require('firebase/firestore')
Vue.config.productionTip = false;

let app = '';




// Reference messages collection
var messagesRef = firebase.database().ref('messages');


  // Listen for form submit
  var contactForm = document.getElementById('contactForm');
  if(contactForm)
  {
    contactForm.addEventListener('submit', submitForm)
  }


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
