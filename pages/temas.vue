<template>
  <div>
    <h1>Temas</h1>

    <ul>
      <li v-for="(tema, i) in temas" v-bind:key="i">
        {{ tema.nombre }} - {{ tema.autor }} - {{ tema.votos }}
      </li>
    </ul>

    <h1>Postea</h1>
    <h2>Ingresar nombre y autor para submitear</h2>

    <form @submit.prevent="submit">
      <input type="text" placeholder="Tema" v-model="tema" />
      <input type="text" placeholder="Autor" v-model="autor" />
      <input type="number" placeholder="Voto" v-model="count" />
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
    const dbRef = firebase.database().ref();
    dbRef.child("temas").on("value", (snapshot) => {
      this.temas = snapshot.val();
    });
  },
  data() {
    return {
      temas: [],
      tema: "",
      count: 0,
      autor: "",
      error: "",
    };
  },
  methods: {
    submit() {
      let db = firebase.database();

      const temaId = this.tema + "_" + this.autor;
      let temaRef = db.ref("temas");

      // Si no existe lo agrega, sino lo updatea
      // TODO: case insensitive?+
      temaRef.child(temaId).set({
        nombre: this.tema,
        autor: this.autor,
        votos: this.count,
      });
    },
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