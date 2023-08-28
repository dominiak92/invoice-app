<template>
  <div class="welcomeWrapper">
      <img class="logo" src="~/assets/logo.png"
    />
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
}
</script>

<style lang="scss" scoped>
.welcomeWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  animation: myAnim 1s cubic-bezier(0.76, 0, 0.24, 1) 0s 1 normal forwards;
  .logo {
    max-width: 80vw;
  }
  .description {
    margin-top: 2rem;
    text-align: center;
    animation: myAnim 1.2s cubic-bezier(0.76, 0, 0.24, 1) 0s 1 normal forwards;
    p {
        animation: myAnim 1.3s cubic-bezier(0.76, 0, 0.24, 1) 0s 1 normal forwards;
      margin-top: 0.2rem;
      color: #888eb0;
    }
  }
}

@keyframes myAnim {
	0% {
		opacity: 0;
		transform: translateX(-250px);
	}

	100% {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>
