<template>
  <div>
    <h1>Temas</h1>

    <ul>
      <li v-for="(tema, i) in temas" v-bind:key="i">
        Nombre: {{ tema.nombre }} - Autor: {{ tema.autor }} - Votos: {{ tema.votos }}
        <button @click="vote(tema)">+1</button>

      </li>
    </ul>

    <h1>Agregar temas</h1>
    <h2>Ingresar nombre y autor para submitear</h2>

    <form @submit.prevent="submit">
      <input type="text" placeholder="Tema" v-model="tema" />
      <input type="text" placeholder="Autor" v-model="autor" />

      <button :disabled="!tema || !autor" type="submit">Submit</button>
    </form>
    <div class="error" v-if="error">{{ error.message }}</div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firebase-database";
import { getUserFromCookie } from "@/helpers";

export default {
  mounted() {
     let db = firebase.database();
      const dbRef = db.ref();

      const customerId = 'customer1';
      const customerRef = dbRef.child(customerId);

      const customerTemasRef = customerRef.child('temas');
    customerTemasRef.on("value", (snapshot) => {
      this.temas = snapshot.val();
    });
  },
  data() {
    return {
      temas: [],
      tema: "",
      autor: "",
      error: "",
    };
  },
  methods: {
    submit() {
     let db = firebase.database();
      const dbRef = db.ref();

      const customerId = 'customer1';
      const customerRef = dbRef.child(customerId);

      const customerTemasRef = customerRef.child('temas');

      const temaId = this.tema.toLowerCase().split(' ').join('_') + "_" + this.autor.toLowerCase().split(' ').join('_');

      // Si no existe lo agrega, sino lo updatea
      // TODO: case insensitive?+
      customerTemasRef.child(temaId).set({
        nombre: this.tema,
        autor: this.autor,
        votos: 0
      });
    },
    vote(tema) {
      let db = firebase.database();
      const dbRef = db.ref();

      const customerId = 'customer1';
      const customerRef = dbRef.child(customerId);

      const customerTemasRef = customerRef.child('temas');

      const temaId = tema.nombre.toLowerCase().split(' ').join('_') + "_" + tema.autor.toLowerCase().split(' ').join('_');

      // Si no existe lo agrega, sino lo updatea
      // TODO: case insensitive?+
      customerTemasRef.child(temaId).set({
        nombre: tema.nombre,
        autor: tema.autor,
        votos: tema.votos ? ++tema.votos : 1,
      });
    }
  },
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      if (!user) {
        redirect("/login");
        alert("No estás logeado perro");
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/login");
        alert("No estás logeado perro");
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>