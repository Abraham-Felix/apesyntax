<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
        <v-img
          :src="require('../assets/apesyntaxlogo.png')"
          class="my-10"
          contain
          v-bind="attrs"
          v-on="on"
          height="200"
        />
        </template>
         <span>Hello I am Monk,<br>
         a synthetic Ape.</span>
        </v-tooltip>
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
  .v-image {
    width:min-content;
    margin-left:auto;
    margin-right:auto;
  }
</style>
