<template>
  <div class="App" data-app>
    <AppHeader />
    <nuxt />
  </div>
</template>
<script>
import AppHeader from '~/components/AppHeader.vue'
export default {
  components: { AppHeader },
}
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@500;700&display=swap');
.App {
  background-color: $white;
  font-family: 'League Spartan', sans-serif;
  
}
</style>
