<template>
  <div class="header">
    <div class="logo">
      <NuxtLink to="/"><fa :icon="['fa', 'file-invoice']" /></NuxtLink>
    </div>
    <div v-if="$auth.loggedIn" class="menubtn logout">
      <div class="loggedName">
        <p class="underlined underline-clip">
          Logged as {{ $auth.user.name }}!
        </p>
      </div>
      <v-btn
        plain
        elevation="13"
        color="red"
        class="logoutBtn"
        text
        @click="logout"
        >Logout</v-btn
      >
    </div>
    <div v-else class="menubtn login">
      <fa :icon="['fa', 'right-to-bracket']" />
      <NuxtLink to="/login"><p>Login</p></NuxtLink>
    </div>
    <div v-if="!$auth.loggedIn" class="menubtn">
      <fa :icon="['fa', 'user']" />
      <NuxtLink to="/register"><p>Register</p></NuxtLink>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'AppHeader',
  methods: {
    ...mapActions('user', ['logout']),
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/breakpoints.scss';
@import '../assets/mixins.scss';
.header {
  width: 100%;
  height: 72px;
  background-color: $headerbackground;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }
  .logo {
    width: 72px;
    height: 100%;
    color: $white;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #6900ff;
    background: -webkit-linear-gradient(156deg, #6900ff 0%, #9951ff 100%);
    background: linear-gradient(156deg, #6900ff 0%, #9951ff 100%);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .menubtn {
    width: 100px;
    padding: 10px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-left: 2px solid $line;
    color: white;
    text-align: center;
    .underlined {
      /*   background: red; */
      position: relative;
    }
    .underline-clip:after {
      content: '';
      position: absolute;
      top: 95%;
      width: 120%;
      aspect-ratio: 3 / 1;
      left: 50%;
      transform: translate(-50%, 0);
      border-radius: 50%;
      border: 2px solid #9277FF;
      /* Use a clip-path to hide and show the bits you want */
      clip-path: polygon(0 0, 50% 50%, 100% 0);
    }
  }
  .login {
    margin-right: 0;
    margin-left: auto;
  }
  .logout {
    display: flex;
    width: 14rem;
    margin-right: 0;
    margin-left: auto;
    @include md {
      .loggedName {
        word-break: break-word;
      }
    }
    .logoutBtn {
      color: white;
    }
  }
}
</style>
