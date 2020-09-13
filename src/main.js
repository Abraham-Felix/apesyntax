// modules
import Vue from 'vue'
import firebase from './plugins/firebase'
import VueResorce from 'vue-resource'
import './plugins/axios'
import vuetify from './plugins/vuetify';
// components
import App from './App.vue';
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
this.authUser = user
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
