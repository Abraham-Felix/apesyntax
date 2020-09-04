"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
<<<<<<< HEAD
  apiKey: "AIzaSyAt7e2pEhvHg9ea5qpG7pOReSh_xFnAYOI",
  authDomain: "apesyntax.firebaseapp.com",
  databaseURL: "https://apesyntax.firebaseio.com",
  projectId: "apesyntax",
  storageBucket: "apesyntax.appspot.com",
  messagingSenderId: "970915545e858",
  appId: "1:970915545858:web:e9b093968d646dc8e0781b",
  measurementId: "G-15YM4ZEF9V"
=======
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
>>>>>>> ab7b3afe74ad958e3898b516508a38af78ec0184
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
