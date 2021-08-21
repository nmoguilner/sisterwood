<template>
    <div>
        <h1>Login</h1>

        <p>
            user: sisterwood@sisterwood.com<br/>
            pass: sisterwood
        </p>
        <form @submit.prevent="pressed">
            <input type="email" placeholder="email" v-model="email">
             <input type="text" placeholder="password" v-model="password">
             <button>Login</button>
        </form>
        <div class="error" v-if="error">{{error.message}}</div>
    </div>
  
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        data(){
            return {
                email: '',
                password: '',
                error: ''
            }
        },
        methods: {
            pressed(){
               firebase.auth().signInWithEmailAndPassword(this.email, this.password)
               .then(data => {
                   console.log(data);
                   this.$router.push('/secret');
               })
               .catch(error => {
                   this.error = error;
               })
            }
        }
        
    }
</script>

<style scoped>
.error {
    color: red;
    padding: 10px;
}

</style>