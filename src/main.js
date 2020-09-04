// modules
import Vue from 'vue'
import './plugins/axios'
import firebase from 'firebase'
import VueResorce from 'vue-resource'
// components
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from "./store";
// css
import './styles/app.css';

Vue.use(VueResorce)
require('firebase/firestore')
Vue.config.productionTip = false;
let app = '';

firebase.auth().onAuthStateChanged(user =>  {
store.dispatch("fetchUser", user);
});


firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      store,
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
