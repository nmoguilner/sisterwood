<template>
  <div>
    <h1>Temas</h1>

    <ul>
      <li v-for="(tema, i) in temas" v-bind:key="i">
        {{ tema.nombre }} - {{ tema.autor }} - {{ tema.votos }}
      </li>
    </ul>

    <h1>Postea</h1>

    <form @submit.prevent="submit">
      <input type="text" placeholder="Tema" v-model="tema" />
      <input type="text" placeholder="Autor" v-model="autor" />
      <input type="number" placeholder="Voto" v-model="count" />
      <button type="submit">Submit</button>
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
    let temasRef = db.ref("temas");
    temasRef.on("value", (snapshot) => {
      console.log("temas", temas);
      const temas = snapshot.val();
      this.temas = temas;
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
      let temasRef = db.ref("temas");

      const newTema = {
        nombre: this.tema,
        autor: this.autor,
        votos: this.count,
      };

      temasRef.push(newTema);
    },
  },
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      if (!user) {
        redirect("/login");
        alert('No estás logeado perro');
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/login");
        alert('No estás logeado perro');
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>