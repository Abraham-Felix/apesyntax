import Vue from 'vue'
import firebase from 'firebase'

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

import './styles/app.css';

Vue.config.productionTip = false;

let app = '';

firebase.initializeApp({
  apiKey: "AIzaSyAt7e2pEhvHg9ea5qpG7pOReSh_xFnAYOI",
  authDomain: "apesyntax.firebaseapp.com",
  databaseURL: "https://apesyntax.firebaseio.com",
  projectId: "apesyntax",
  storageBucket: "apesyntax.appspot.com",
  messagingSenderId: "970915545858",
  appId: "1:970915545858:web:e9b093968d646dc8e0781b",
  measurementId: "G-15YM4ZEF9V"
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
