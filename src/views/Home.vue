<style >

li {
    color: dodgerblue;
    font-size: 18px;
    padding: 1vw;
}

.v-card {
    width: 420px;
    margin-left: auto;
    margin-right: auto;
    padding: 3vw;
}

.v-image {
    width: min-content;
    margin-left: auto;
    margin-right: auto;
}

</style>

<template>

<v-container>
    <v-row class="text-center">
        <v-col cols="12">
            <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                    <v-img :src="require('../assets/apesyntaxlogo.png')" class="my-10" contain v-bind="attrs" v-on="on" height="200" />
                </template>
                <img class="monk-ico" src="https://celfonica.s3-us-west-1.amazonaws.com/logos/monk-circle+50px.png">
                <span style="display:inline;">
             you hovered over me!? didn't you?... <br><br>
             Hello I am Monk,<br>
             a virtual Ape here to help you!<br><br>
            <p>"ignore my weird behaviors"</p><br>
            </span>
            </v-tooltip>
        </v-col>
        <v-col class="mb-4">
            <v-card>
                <h3> New features coming soon!</h3>
                <li> Skeleton Loader with real data</li>
                <li> Lesson form/viewer/editor </li>
                <li> google auth / git auth </li>
                <br>
                <br>
                <h4>Look around... or send a message to <router-link to="/contact">contact</router-link></h4>
                <br>
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
