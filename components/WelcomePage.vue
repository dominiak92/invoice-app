<template>
  <div class="welcomeWrapper">
    <img class="logo" src="~/assets/logo.png" />
    <div class="description">
      <h2>Welcome to the invoice app</h2>
      <p>Please <strong>login</strong> to start and manage your invoices</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
.welcomeWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .logo {
    max-width: 80vw;
  }
  .description {
    margin-top: 2rem;
    text-align: center;
    p {
        margin-top: 0.2rem;
        color: #888EB0;
    }
  }
}
</style>
