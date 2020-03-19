<template>
  <div class="home">
    <div class="home-text">
      {{ newUser }}
      <label class="home-text__label">Email</label>
      <input class="home-text__input"
             v-model="newUser.email"
             type="email"
             placeholder="Email">
    </div>
    <div class="home-text">
      <label class="home-text__label">Password</label>
      <input class="home-text__input"
             v-model="newUser.password"
             type="password"
             placeholder="Password">
    </div>
    <div class="home-button">
      <button type="button"
              class="home-button__btn"
              @click="signUp()"
      >Sign up</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      newUser: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    signUp() {
      axios
        .post('localhost:3000/api/auth/login', {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>


<style lang="scss" scoped>
  .home {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    &-button {
      margin-top: 15px;
      &__btn {
        width: 100%;
        height: 40px;
        background: blueviolet;
        color: white;
        border: none;
        transition: opacity .3s ease-in;
        cursor: pointer;
        &:hover {
          opacity: .8;
        }
      }
    }
    &-text {
      &__label {
        display: block;
        text-align: left;
        margin: 15px 0;
      }
      &__input {
        width: 100%;
        height: 40px;
        padding-left: 20px;
        padding-right: 10px;
        font-size: 20px;
        box-sizing: border-box;
      }
    }
  }
</style>
