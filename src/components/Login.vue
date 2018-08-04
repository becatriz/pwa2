<template>
<div>
<v-container>
	  <v-form v-model="valid">
   
    <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>
     <v-text-field
      v-model="password"
      :rules="nameRules"
      type="password"
      :counter="10"
      label="Senha"
      required
    ></v-text-field>	

 	</v-form>
 	  <v-btn color="success" @click="submit">Success</v-btn>
 	
</v-container>
</div>
</template>
<script>
import firebase from 'firebase'

	export default{
		name: "Login",
		data(){
		return{
		valid: false,
		password:'',
		email:'',
		nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      		]


		}
	},


	methods:{
	submit(){
	const auth = firebase.auth();
	auth.signInWithEmailAndPassword(this.email, this.password).then((response) => {
		this.$router.push('/home')
	}).cath(error => {
		alert(error.message)
	})
	console.log(this.name)
	console.log(this.email)
		}
	}

};





</script>
<style></style>