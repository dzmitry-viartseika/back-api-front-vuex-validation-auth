<template>
  <form @submit.prevent="submit">
    {{ users }}
    <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
      <label class="form__label">Email</label>
      <input class="form__input" v-model.trim="$v.email.$model"/>
    </div>
    <div class="error" v-if="!$v.email.required">Email is required</div>
    <div class="error" v-if="!$v.email.minLength">Email must have at least
      {{$v.email.$params.minLength.min}} letters.</div>
    <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
      <label class="form__label">Password</label>
      <input class="form__input" v-model.trim="$v.password.$model"/>
    </div>
    <div class="error" v-if="!$v.password.required">Password is required</div>
    <div class="error" v-if="!$v.password.minLength">Password must have at least
      {{$v.password.$params.minLength.min}} letters.</div>
    <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
    <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  data() {
    return {
      password: '',
      email: '',
      submitStatus: null,
      users: [],
    };
  },
  validations: {
    email: {
      required,
      minLength: minLength(3),
    },
    password: {
      required,
      minLength: minLength(3),
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        // log in
        // fetch('http://localhost:3000/users/login', {
        //   method: 'post',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     email: this.email,
        //     password: this.password,
        //   }),
        // });
        // sign up
        fetch('http://localhost:3000/api/auth/login', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });
        setTimeout(() => {
          this.submitStatus = 'OK';
        }, 500);
      }
    },
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/database')
      .then((response) => {
        this.users = response.data;
      }).catch((err) => console.log(err));
  },
};

</script>
