<template>
  <div class="main-ct">
    <div class="header">
        <button v-on:click="logout()">Logout</button>
        <h1>Admin Console</h1>
        <p>Select a ticket and select a lawyer to send the ticket to the lawyer's email.</p>
    </div>

    <div class="tickets">
        <h2>Open Tickets</h2>

        <div v-on:click="selectTicket(ticket)" v-for="ticket in tickets" v-bind:key="ticket.id" class="ticket" v-bind:class="{ selected: selectedTicket && selectedTicket.id == ticket.id }">
            <h3>{{ ticket.first_name + ' ' + ticket.last_name }} - <a :href="'mailto:' + ticket.email">{{ ticket.email }}</a> - {{ ticket.phone }}</h3>
            <textarea name="description" v-model="ticket.description"></textarea>
        </div>
    </div>

    <div class="lawyers">
        
    </div>
  </div>
</template>

<script>
import { getTickets } from '../../utils/ticket';
import { logout } from '../../utils/auth';

export default {
  name: 'Admin',
  created: function() {
      console.log("called");
      console.log(getTickets);
      getTickets()
        .then(res => {
            console.log(res);
            this.tickets = res.data.filter(x => x.closed == false);
        })
        .catch(err => {
            console.log(err);
        });
  },
  data () {
    return {
      selectedTicket: {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        description: ''
      },
      tickets: [
          {
            first_name: 'loading tickets',
            last_name: '',
            email: '',
            phone: '',
            description: ''
        }
      ],
      loading: false,
      buttonText: 'Submit'
    }
  },
  methods: {
    logout: function() {
        logout();
        this.$router.push('/')
    },
    selectTicket: function(ticket) {
        this.selectedTicket = ticket;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '../styles/_variables'

.tickets
    background-color: $mgj-primary
    width: 50vw
    height: 88vh
    padding: 25px 50px
    float: left
    overflow-y: auto

    .ticket
        background-color: white
        padding: 20px 25px
        margin-top: 10px
        margin-bottom: 10px
        border-radius: 3px
        position: relative

        &:hover
            cursor: pointer
            background-color: #EEEEEE

        &.selected
            padding-bottom: 50px

            &:after
                content: "ticket selected"
                text-align: center
                font-family: "Roboto"
                color: white
                display: inline-block
                position: absolute
                bottom: 0
                font-size: 14px
                right: 0
                left: 0
                line-height: 30px
                height: 30px
                background-color: $mgj-secondary

        h3
            font-family: "Roboto"
            font-weight: 500
            font-size: 16px
            color: #333
            margin-bottom: 15px
        
        textarea
            width: 100%
            font-family: "Roboto"
            min-height: 50px
            background-color: transparent
            font-size: 14px
            border: 1px solid $mgj-primary
            border-radius: 2px
            padding: 10px

    h2
        font-family: "Roboto"
        font-size: 16px
        margin-bottom: 20px
        color: rgba(255, 255, 255, .9)
        font-weight: 500

.header
    padding: 25px 50px
    background-color: #EEEEEE

    button
        float: right
        font-family: "Roboto"
        font-weight: 500
        border: none
        border-radius: 2px
        color: white
        background-color: $mgj-primary
        vertical-align: top
        padding: 10px 20px
        user-select: none

        &:hover
            background-color: $mgj-secondary
            transition: all .2s ease
            cursor: pointer

    h1
        font-family: "Roboto"
        font-weight: 500
        font-size: 18px
        color: #333
    
    p
        font-family: "Roboto"
        font-size: 14px
        margin-top: 8px

</style>
