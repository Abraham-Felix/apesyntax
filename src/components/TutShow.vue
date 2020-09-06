<style scoped>
h1 {
    color: #ffffff;
}
img.preview {
  max-width:200px;
}

.v-card {
  width: auto !important;
}
.v-card-title {
  word-break: break-word;
}
.v-divider {
  max-width: 80%;
    margin-right: auto;
    margin-left: auto;
}
.container {
  padding:0px;
}
</style>

<template>
<v-container id="tutshow">
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
</v-container>

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
