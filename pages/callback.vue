<template>
  <div>
    <h1>Callback</h1>
    <h1>Data fetched using asyncData</h1>

<ul>

 <li v-if="this.access_token">Acces token: {{ access_token }}</li>

    <li v-if="this.playerData">Device Id: {{ playerData.device.id }}</li> - <span>Si tenes la cuenta abierta en otro player deberia devolver el device id</span>

</ul>
    <button @click="playExternalPlayer()">Play External Player</button>
  </div>
</template>

<script>
export default { 
  methods: {
    playExternalPlayer() {
    this.$axios.$put('https://api.spotify.com/v1/me/player/play?device_id=' + this.playerData.device.id, {}, {
      headers: {
        Authorization: "Bearer " + this.access_token,
      },
    });
    },
  },
  async asyncData({ route, $axios }) {
  const hash = route.hash.substring(1);
    const accessString = hash.indexOf("&");

    /* 13 because that bypasses 'access_token' string */
    const access_token = hash.substring(13, accessString);

    const playerData = await $axios.$get(
      "https://api.spotify.com/v1/me/player",
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

 
    return {
      playerData,
      access_token
    };
  },
};
</script>

<style lang="scss" scoped>
</style>