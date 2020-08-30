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
   src="https://celfonica.s3-us-west-1.amazonaws.com/logos/ape-contact.png"
   transition="scale-transition"
   width="100"
 />
  <v-card-text>
    <h1>contact form</h1>
     <ContactForm/>
    </v-card-text>
  </v-card>
  </body>
</template>

<script>

import ContactForm from '../components/ContactForm.vue';


export default {
  name: 'contact',
  components: {
    ContactForm,
  }
}

</script>


<style scoped>
  h1 {
    margin-bottom:1vw;
  }
  .bold {
    -webkit-text-stroke-width: medium;
  }
  .v-card{
    display:inline-block;
    max-width: 600px !important;
    width: -webkit-fill-available !important;
  }
  .margin {
    margin:10px !important;
  }
  .mx-auto {
   margin-top: 10vw;
   margin-bottom: 10vw;
  }
  .v-input .v-label {
    margin: 0.4vw !important;
}
.v-image {
   z-index: 0 !important;
}
</style>
