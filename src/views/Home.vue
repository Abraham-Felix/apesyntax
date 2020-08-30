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
    margin-top:-90px;
}

.v-image {
    width: min-content;
    margin-left: auto;
    margin-right: auto;
    z-index: 9;
}

</style>

<template>

<v-container>
    <v-row class="text-center">
        <v-col cols="12">
            <v-tooltip center>
                <template v-slot:activator="{ on, attrs }">
                    <v-img :src="require('../assets/apesyntaxlogo.png')" class="my-10" contain v-bind="attrs" v-on="on" height="200" />
                </template>
                <img class="monk-ico" src="https://celfonica.s3-us-west-1.amazonaws.com/logos/monk-circle+50px.png">
                <span style="display:inline;">
             you tried to hovered over me!? didn't you?... <br><br>
             Hello I am Monk,<br>
             a virtual Ape here to help you!<br><br>
            <p>"ignore my weird behaviors"</p><br>
            </span>
            </v-tooltip>
        </v-col>
        <v-col class="mb-4">
            <v-card >
                <h3> New features coming soon!</h3>
                <v-card-text>
                  <p>- Skeleton Loader with real data</p>
                   <p>- google auth / git auth </p>
                 </v-card-text>
                <br>
                <br>
                <h5>Look around... i got a new tutorial component <br>
                  where i will share some knowledge<br>
                  or send a <router-link to="/contact">message</router-link>.</h5>
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
