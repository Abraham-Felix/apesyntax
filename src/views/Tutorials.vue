<style scoped>

.tutshow {
    background: linear-gradient(45deg, #0072e2, #4abde0);
    color: #ffffff !important;
}

</style>
<template>
<body>
<div class="m-tb-20">
<TutForm/>
  </div>
  <div>
<v-card
   class="m-tb-20 tutshow"
   max-width="344">
  <TutShow/>
</v-card>
</div>
  </body>
</template>

<script>

import TutForm from '../components/TutForm.vue';
import TutShow from '../components/TutShow.vue';

export default {
  name: 'tutorials',
  components: {
    TutForm,
    TutShow,
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
</style>
