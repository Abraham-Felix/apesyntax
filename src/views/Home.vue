<template>
  <div class="home">
  <v-container>
    <v-btn @click="logout">Logout</v-btn>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/apesyntaxlogo.png')"
          class="my-10"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          welcome!
        </h1>


      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'home',
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
<style scoped>

</style>
