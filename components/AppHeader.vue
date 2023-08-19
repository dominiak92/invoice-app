<template>
  <div class="header">
    <div class="logo">
      <NuxtLink to="/"><fa :icon="['fa', 'file-invoice']" /></NuxtLink>
    </div>
    <div v-if="$auth.loggedIn" class="menubtn logout">
      Logged in as {{ $auth.user.name }}
      <v-btn class="logoutBtn" text @click="logout">Logout</v-btn>
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
  }
  .login {
    margin-right: 0;
    margin-left: auto;
  }
  .logout {
    display: flex;
    width: 300px;
    margin-right: 0;
    margin-left: auto;
    .logoutBtn {
      color: white;
    }
  }
}
</style>
