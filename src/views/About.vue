<style scoped>

h1 {
    margin-bottom: 1vw;
}

.bold {
    -webkit-text-stroke-width: medium;
}

.v-card {
    display: inline-block;
}

.margin {
    margin: 10px !important;
}

.mx-auto {
    margin-top: 10vw;
    margin-bottom: 10vw;
}
.v-image {
  z-index:0;
}

</style>

<template>
    <v-card class="mx-auto" max-width="420">
        <v-img
        alt="Apesyntax logo"
        class="shrink mr-2 margin center"
        contain src="https://celfonica.s3-us-west-1.amazonaws.com/imgs/avatar-AbrahamFelix-3.png"
        transition="scale-transition" width="100" /><br>
        <v-card-title class="center">
            <h5 >Abraham Felix</h5>
        </v-card-title>
        <h5>UX/UI Design | Front end Developer </h5><br>
        <v-divider></v-divider>
        <v-card-text>
            <h5>About Vision:</h5>
            <br>
            <p> I am trying to develop something that will help programers learning experience, keep engaging with current knowledge as live data and a place to store tutorials for research.</p>
            <h5>About the App:</h5>
            <br>
            <p> The tool will grow along the way with the data flow, so expect new changes often and new ideas. so <span class="bold">hang</span> on tight this could be quite a journey! </p>
            <h5>Languages Used:</h5><br>
            <h5> Html, Css, Sass, Js, Vue.js, Firebase, Webpack </h5>

        </v-card-text>
    </v-card>
</template>
