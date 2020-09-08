// Config file
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAt7e2pEhvHg9ea5qpG7pOReSh_xFnAYOI",
  authDomain: "apesyntax.firebaseapp.com",
  databaseURL: "https://apesyntax.firebaseio.com",
  projectId: "apesyntax",
  storageBucket: "apesyntax.appspot.com",
  messagingSenderId: "970915545e858",
  appId: "1:970915545858:web:e9b093968d646dc8e0781b",
  measurementId: "G-15YM4ZEF9V"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
