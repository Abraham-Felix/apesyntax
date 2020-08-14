<template>
<body>
<v-card class="center">
 <div class="sign-up">
 <h3> Sign up </h3>
 <br>
 <p>Let's create a new account!</p>
   <input type="text" placeholder="Email"><br>
   <input type="password" placeholder="Password"><br>
   <button>sign up</button>
   <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
  </v-card>
  </body>
</template>

<script>
  export default {
    name:  'signUp',
    data() {
      return {}
    },
    methods: {}
  }
  </script>

  <style scoped>
  .v-card {
    margin: 10vw;
    height: 400px;
    padding: 2vh;
    max-width: 600px !important;
    width: min-content;
  }
  button {
    box-shadow: 0px 0px 3px -2px #b6bbc0 ;
    background: #b6bbc0;
    color:white;
    padding:.5vh;
    border-radius: 10px;
    margin:2vh;
  }
  .signUp {
      margin-top:40px;
    }
    span {
    display:block;
    margin-top: 20px;
    font-size: 11px;
    }
</style>
