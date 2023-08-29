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
@import '../assets/breakpoints.scss';
@import '../assets/mixins.scss';
.App {
  background-color: $white;
  height: 100vh;
  font-family: 'League Spartan', sans-serif;
  @include xl {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
  }
  
}
</style>
