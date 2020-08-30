import Vue from 'vue'
import firebase from 'firebase'
import VueResorce from 'vue-resource'

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

import './styles/app.css';

Vue.use(VueResorce)
require('firebase/firestore')
Vue.config.productionTip = false;
let app = '';


firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
