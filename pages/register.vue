<template>
  <div class="registerWrapper">
    <p class="title">Register</p>
    <div class="text-center"></div>
    <div class="formWrapper">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="registrationInfo.name"
          :counter="20"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="registrationInfo.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="registrationInfo.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          required
          :rules="passwordRules"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn :disabled="!valid" color="black" class="mr-4" @click="validate">
          Submit
        </v-btn>

        <v-btn color="black" class="mr-4" @click="reset"> Reset </v-btn>
      </v-form>
      <v-card>
        <v-snackbar
          v-model="snackbar"
          :timeout="3000"
          centered
          color="red accent-2"
        >
        The user already exists, or another error has occurred. Try again
        </v-snackbar>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    show1: false,
    valid: true,
    snackbar: false,
    registrationInfo: {
      name: '',
      email: '',
      password: '',
    },
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 20) || 'Must be less than 20 characters',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        (v && v.length <= 10) || 'Password must be less than 20 characters',
    ],
  }),

  methods: {
    async validate() {
      try {
        await this.registerUser(this.registrationInfo)
      } catch {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    async registerUser(registrationInfo) {
      await this.$axios.post('/users', registrationInfo)
      this.$auth.loginWith('local', {
        data: registrationInfo,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.registerWrapper {
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  .title {
    font-size: 34px;
    font-weight: 700;
  }
  .formWrapper {
    width: 60vw;
  }
}
</style>
