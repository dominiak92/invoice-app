<template>
  <div class="loginWrapper">
    <p class="title">Login</p>
    <div class="formWrapper">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
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
       
      </v-form> <v-card>
          <v-snackbar
            v-model="snackbar"
            :timeout="2000"
            centered
            color="red accent-2"
          >
            Login failed, please try again
          </v-snackbar>
        </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    show1: false,
    valid: true,
    email: '',
    snackbar: false,
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        (v && v.length <= 10) || 'Password must be less than 20 characters',
    ],
  }),
  methods: {
    async validate() {
      try {
        if (this.$refs.form.validate()) {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
        }
      } catch {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>
<style lang="scss" scoped>
.loginWrapper {
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
