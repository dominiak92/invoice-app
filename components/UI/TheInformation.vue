<template>
  <div class="welcomeWrapper">
    <img class="logo" src="~/assets/invoice-welcome.png" />
    <div class="description">
      <h2>There is nothing here!</h2>
      <p>
        Create an invoice by clicking the <strong>new</strong> button and get
        started!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheInformation',

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
  justify-content: space-around;
  align-items: center;
  min-height: 30vh;
  padding: 3rem;
  .logo {
    max-width: 60vw;
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
