<template>
  <div class="login-container">
    <div class="v-center-container">
      <div class="header">
        <h1>Admin Console</h1>
        <p>Please sign in to continue.</p>
      </div>

      <form>
        <p class="error">{{ formError }}</p>
        <div class="form-group">
          <input type="email" v-model="email" placeholder="Email">
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Password">
        </div>
        <button type="button" v-on:click="handleLogin()">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '../../utils/auth';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      formError: ''
    };
  },
  methods: {
      handleLogin() {
          this.formError = "Loading...";
          login(this.email, this.password)
            .then(x => this.$router.push('/admin'))
            .catch(err => this.formError = err);
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import '../styles/_variables'

.login-container
  position: relative
  min-height: 100vh

.v-center-container
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

.header 
  .logo
    max-width: 200px
    display: block
    margin: 0 auto
  
  h1
    font-family: "Roboto"
    font-weight: 700
    text-align: center
    font-size: 18px
    color: $mgj-primary
    margin-top: 30px
  
  p
    font-family: "Roboto"
    font-weight: 400
    font-size: 14px
    color: #777
    margin-top: 7px
    text-align: center

form
  text-align: center
  padding: 20px

  input
    width: 250px
    font-family: "Roboto"
    font-size: 14px
    font-weight: 500
    padding: 10px 15px
    border: 0
    background-color: #F5F5F5
    border: 1px solid #DCDCDC
    color: #404040
  
  input[type=email]
    margin-bottom: 10px
  
  button
    width: 250px
    border: 1px solid $mgj-dark
    background-color: $mgj-primary
    color: white
    font-family: "Roboto"
    font-size: 14px
    font-weight: 500
    text-align: center
    padding: 10px 15px
    margin-top: 25px

    &:hover
      background-color: $mgj-dark
      cursor: pointer
    
  .error
    font-family: "Roboto"
    font-size: 14px
    font-weight: 500
    color: #cc0000
    margin-bottom: 15px

</style>
