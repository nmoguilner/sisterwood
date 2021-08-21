<template>
     <div>
    <nuxt-link to="/">Home</nuxt-link>
    <a href="javascript:void(0)" @click="logout" v-if="loggedIn">Logout</a>
    <nuxt-link to="login" v-else>Login</nuxt-link>
    <nuxt-link to="temas">Temas</nuxt-link>
    <Nuxt />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import Cookies from 'js-cookie';

export default {
  mounted(){
    this.setupFirebase();
  },
  data() {
    return {
      loggedIn: false
    }
  },
  methods: {    
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log('logged in');
          this.loggedIn = true;
          firebase.auth().currentUser.getIdToken(true)
          .then(token => {            
            Cookies.set('access_token', token);
          });
        } else {
          console.log('logged out');
          this.loggedIn = false;
          Cookies.remove('access_token');
        }
      })
    },
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$router.push('/');
      })
    }
  }
}
</script>