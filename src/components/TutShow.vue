<style scoped>
h1 {
    color: #ffffff;
}
img.preview {
  max-width:200px;
}
.tut-show {
  margin:20px !important;
}
.v-card {
  width: auto;
}
</style>

<template>
<div id="tutShow">
    <h1>Tutorials</h1>
    <v-card v-for="(tutorials,index) in tutorials" :key="index" class="m-tb-20 tut-show" >
        <v-card-title class="center">
            <img class="preview" :src="tutorials.picture"><br>
            {{ tutorials.title}}
        </v-card-title>
        <v-divider color="#2196f3"></v-divider>
        <v-card-subtitle>
            by {{tutorials.first}} {{tutorials.last}}
        </v-card-subtitle>
        <v-card-text>
            {{ tutorials.content }}
        </v-card-text>
        <v-card-text>
            {{ tutorials.language }}
        </v-card-text>
        <v-card-text>
            <v-icon>mdi-codepen</v-icon>
            <a v-bind:href="''"> {{ tutorials.code }} </a>
        </v-card-text>
        <v-card-text>
            Published: {{ tutorials.date }}
        </v-card-text>
    </v-card>
</div>

</template>

<script>

export default {
    name: 'tutShow',
    data() {
        return {
            tutorials: [],
        }
    },
    methods: {
    },
    created() {
        this.$http.get('https://apesyntax.firebaseio.com/tutorials.json').then(response => response.json())
            .then(data => {
                let list = [];
                for (let key in data) {
                    list.push({
                        ...data[key],
                            id: key
                    })
                }
                console.log(list)
                this.tutorials = list;
            })
    },
}

</script>
