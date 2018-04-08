<template>
  <div class="main-ct">
    <div class="intro">
      <div class="intro-container">
        <h1>Join Middle Georgia Justice</h1>
        <p>Are you interested in helping the citizens of middle georgia access
            affordable legal assistance? Fill out the form to the side to 
            be entered into the system.
        </p>
        <h2>Verification Process</h2>
        <p>It may take 24-48 hours to verify your information and enter you into
            the system. You will be contacted by the administrator once the
            process has been completed.
        </p>
        <div class="links">
          <a href="">Donations</a>
          <a href="">Events</a>
          <a href="">Incubator Program</a>
          <a href="">About Us</a>
        </div>
        <div class="portals">
          <a href="">Lawyer Portal</a>
          <router-link to="/admin">Admin Portal</router-link>
        </div>
        <img src="../assets/newLogo.png" alt="">
      </div>
    </div>
    <div class="form">
      <div class="form-container">
        <h1>Join MGA Justice</h1>
        <div class="name">
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input type="text" v-model="form.first_name" name="first_name" id="">
          </div>
          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input type="text" name="last_name" v-model="form.last_name">
          </div>
        </div>
        <div class="contact">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" v-model="form.email">
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" name="phone" v-model="form.phone">
          </div>
        </div>
        <button v-on:click="submitForm" :disabled="loading" class="submit">{{ buttonText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createLawyer } from '../../utils/lawyer';

export default {
  name: 'Home',
  data () {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      },
      loading: false,
      buttonText: 'Submit'
    }
  },
  methods: {
    submitForm: function() {
      console.log(JSON.stringify(this.form));
      this.loading = true;
      this.buttonText = 'Loading...';

      createLawyer(this.form)
        .then(res => {
          console.log(res);
          this.loading = false;
          this.buttonText = 'Your request has been submitted!'
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          this.buttonText = 'Error! (Please refresh and try again)'
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '../styles/_variables'

.form
  background-color: $mgj-primary
  padding: 100px

  h1
    font-family: "Roboto"
    font-weight: 500
    font-size: 22px
    margin-bottom: 15px
    color: white

    &::after
      display: block
      content: ""
      width: 50px
      height: 3px
      background-color: rgba(255, 255, 255, .6)
      margin-top: 15px
  
  .submit
    font-family: "Roboto"
    background-color: $mgj-secondary
    border: none
    color: white
    padding: 10px 20px
    width: 383px
    font-weight: 500
    margin-top: 30px
    display: block  

    &:hover
      transition: all .3s ease
      cursor: pointer
      background-color: $mgj-secondary-dark

  .name, .contact, .desc
    margin-top: 20px

  .form-group
    margin-right: 15px
    display: inline-block

    input
      font-family: "Roboto"
      padding: 7px 10px
      border-radius: 2px
      border: none
    
    textarea
      width: 383px
      border-radius: 2px
      border: none
      padding: 7px 10px
      font-family: "Roboto"

    label
      font-family: "Roboto"
      font-size: 14px
      display: block
      font-weight: 500
      color: rgba(255, 255, 255, .7)
      margin-bottom: 7px

.intro, .form
  height: 100vh
  display: inline-block
  vertical-align: top
  width: 50%
  float: left

.intro
  padding: 100px

  img
    width: 120px
    position: relative
    left: -20px
    margin-top: 30px

  h1
    font-family: "Roboto"
    font-weight: 700
    font-size: 22px
    margin-bottom: 15px
    color: #333

    &::after
      display: block
      content: ""
      width: 50px
      height: 3px
      background-color: $mgj-primary
      margin-top: 15px
  
  h2
    color: #444
    font-family: "Roboto"
    font-weight: 500
    font-size: 18px
    margin-bottom: 15px
    margin-top: 20px

  p
    font-family: "Roboto"
    line-height: 22px
    max-width: 500px
    color: #444
  
  .links
    margin-top: 20px

    a
      font-family: "Roboto"
      font-size: 16px
      margin-right: 10px
      text-decoration: none
      color: blue

      &:hover
        text-decoration: underline
        color: $mgj-primary

  .portals
    margin-top: 30px
    a
      font-family: "Roboto"
      font-size: 14px
      background-color: #666
      color: white
      padding: 10px 15px
      border-radius: 3px
      text-decoration: none
      margin-right: 7px

      &:hover
        transition: all .3s ease
        background-color: $mgj-primary
</style>
