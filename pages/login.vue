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
  
          <v-btn
            :disabled="!valid"
            color="black"
            class="mr-4"
            @click="validate"
          >
            Submit
          </v-btn>
  
          <v-btn color="black" class="mr-4" @click="reset"> Reset </v-btn>
        </v-form>
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
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],    
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length <= 10) || 'Password must be less than 20 characters',
    ],
    
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
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
