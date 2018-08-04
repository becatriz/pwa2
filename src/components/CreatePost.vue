<template>
  <v-container fluid>
      <v-flex xs12 sm6>
        <v-text-field
          label="Digite algo aqui"
          single-line
          solo
          v-model="text"
          @keyup.enter="createPost"
        ></v-text-field>
      </v-flex>
      <v-list two-line>
          <template v-for="(post, index) in posts">

            <v-list-tile
              avatar
              @click=""
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ post }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </template>
        </v-list>
  </v-container>
</template>
<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      text: '',
      posts: ["Post 1","Post 2","Post 3"],
    }
  },
  mounted(){
  	const db = firebase.database();
  	db.ref('/posts').once('value', (item) =>{
  		console.log(item.val());
  		Object.keys(item.val()).forEach((key)=>{
  			this.posts.push(item.val()[key]);
  		})

  	});

  },

  methods: {
    createPost() {
      const db = firebase.database();
      db.ref('/posts/').push( this.text ).then((res) => {
      	res.once('value', (item) => {
      		this.posts.push(item.val())
      		})
      	});
      this.text = '';
    },
  }
};
</script>