<template>
  <div>
    <h1>This is secret info</h1>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { getUserFromCookie } from "@/helpers";

export default {
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      console.log(user);
      if (!user) {
        redirect("/login");
      }
    } else {
      let user = firebase.auth().currentUser;
      console.log(user);
      if (!user) {
        redirect("/login");
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>