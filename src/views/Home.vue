<template>
  <div class="home">
  <v-container>

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
      <v-card >
        <h1 class="display-2 font-weight-bold mb-3">
          Hello, World.
        </h1>
        <p>
         This app runs node.js server and vue.js framework contected to firebase db </p>
        </v-card>
        </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>


export default {
  name: 'home'
}
</script>

<style >
  .v-card {
    width: 420px;
    margin-left:auto;
    margin-right:auto;
  }
</style>
