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

</style>

<template>
    <v-card class="mx-auto" max-width="344">
        <v-img alt="Apesyntax logo" class="shrink mr-2 margin center" contain src="https://celfonica.s3-us-west-1.amazonaws.com/imgs/avatar-AbrahamFelix-3.png" transition="scale-transition" width="100" />
        <v-card-title class="center">
            <h4 >Abraham Felix</h4>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <h5>About Author:</h5>
            <br>
            <p> Hello, my name is abraham felix, I am trying to develop something that will help programers, keep engaging with current knowledge as live data and a place to store tutorials for research.</p>
            <h5>About the App:</h5>
            <br>
            <p> The tool will grow along the way with the data flow, so expect new changes often and new ideas. so <span class="bold">hang</span> on tight this could be quite a journey! </p>
            <h5>Languages Used:</h5><br>
            <h5> Html, Css, Sass, Js, Vue.js, Firebase, Webpack </h5>
        </v-card-text>
    </v-card>
</template>
