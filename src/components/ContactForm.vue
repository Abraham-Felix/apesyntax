<template>
  <v-form
    ref="form"
    v-model="valid"
    method="POST"
    lazy-validation
    @submit="saveContactMessage"
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      color="light-blue accent-4"
      label="E-mail"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Type is required']"
      color="light-blue accent-4"
      label="Type"
      required
    ></v-select>

    <v-textarea
        v-model="message"
        auto-grow
        filled
        color="light-blue accent-4"
        label="Message"
        rows="1"
      ></v-textarea>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>
  </v-form>
</template>
<script>


export default {
  name: 'contactform',
  data: () => ({
    /* data model for form */
      message: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Feed Back',
        'Other',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      /* This method will send data to firebase db */
      saveContactMessage: function (e) {
        e.preventDefault()
        const messagesRef = this.$firebaseDatabase.collection('message')
        messagesRef.add(
          {
            name: this.name,
            select: this.select,
            email: this.email,
            message: this.message,
            time: new Date(),
          },
        )
        this.name= ''
        this.email = ''
        this.message = ''
        this.select = ''
        this.submitted = true
        this.snackbar = false
      },
    },
}

</script>

<style scoped>
input {
  margin: 0px !important;
}
</style>
