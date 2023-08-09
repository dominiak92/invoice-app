<template>
  <div class="registerWrapper">
    <p class="title">Register</p>
    <div class="formWrapper">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="20"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

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
  name: 'Register',
  data: () => ({
    show1: false,
    valid: true,

    name: '',
    // rules: {
    //   required: (value) => !!value || 'Required.',
    // },
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 20) || 'Must be less than 20 characters',
    ],
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
