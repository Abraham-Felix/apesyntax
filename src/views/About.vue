<template>
<body>
<v-card
   class="mx-auto"
   max-width="344"
 >
 <v-img
   alt="Apesyntax logo"
   class="shrink mr-2 margin center"
   contain
   src="https://celfonica.s3-us-west-1.amazonaws.com/logos/apesyntax+logo.png"
   transition="scale-transition"
   width="100"
 />
  <v-card-text>
    <h1>Apesyntax</h1>
    <p> Hello, I am abraham felix i am trying to develop something cool,
    like a library for us to use in our code and add cool features,
    so <span class="bold">hang</span> on tight this could be quite a journey!  </p>
  </v-card-text>
  </v-card>
  </body>
</template>


<style scoped>
  h1 {
    margin-bottom:1vw;
  }
  .bold {
    -webkit-text-stroke-width: medium;
  }
  .v-card{
    display:inline-block;
  }
  .margin {
    margin:10px !important;
  }
  .mx-auto {
   margin-top: 10vw;
   margin-bottom: 10vw;
  }
</style>
