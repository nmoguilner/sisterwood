<template>
  <div>
    <h1>Spotify</h1>

    <button @click="spotifyAuth()">Spotify Auth</button>


    <div class="error" v-if="error">{{ error.message }}</div>
  </div>
</template>

<script>

export default {
  mounted() {
   
  },
  data() {
    return {
     
    };
  },
  methods: {
    spotifyAuth() {
      window.location.href = 'https://accounts.spotify.com/authorize' +'?' +
      'client_id=49ad0766f677479fb8584626153a810f' + '&' +
      'redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback' + '&' +
      'scope=user-read-private%20user-read-email%20playlist-read-private%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private%20user-read-currently-playing%20user-read-playback-position%20streaming' + '&' +
      'response_type=token' + '&' +
      'state=123'
    },
   
  }  
};
</script>

<style lang="scss" scoped>
</style>