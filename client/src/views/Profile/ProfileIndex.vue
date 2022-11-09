<template>
  <div>
    <h1>Profile</h1>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  mounted() {
    console.log("VueJwtDecode =>", VueJwtDecode.decode(localStorage.getItem('accessToken')))
  }
}
</script>

<style>

</style>