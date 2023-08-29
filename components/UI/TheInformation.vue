<template>
  <div class="welcomeWrapper">
    <img class="image" src="~/assets/invoice-welcome.png" />
    <div class="description">
      <h2>There is nothing here yet!</h2>
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
@import '../../assets/breakpoints.scss';
@import '../../assets/mixins.scss';
.welcomeWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 30vh;
  padding: 3rem;
  animation: myAnim 1s ease 0s 1 normal forwards;
  @include xl {
    padding: 1rem;
  }

  .image {
    max-width: 60vw;
    @include md {
      width: 40vw;
    }
    @include xl {
      width: 20vw;
    }
  }
  .description {
    margin-top: 2rem;
    text-align: center;
    @include md {
      font-size: 1.3rem;
    }
    @include xl {
        font-size: 1rem;
    }
    p {
      margin-top: 0.2rem;
      color: #888eb0;
    }
  }
}

@keyframes myAnim {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
