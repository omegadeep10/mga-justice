<template>
  <div class="main-ct">
    <div class="header">
        <h1>Admin Console</h1>
        <p>Select a ticket and select a lawyer to send the ticket to the lawyer's email.</p>
        <button v-on:click="logout()">Logout</button>
    </div>

    <table>
        <tr>
            <th>First name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Description</th>
        </tr>
        <tr v-for="ticket in tickets" v-bind:key="ticket.id">
            <td>{{ ticket.first_name }}</td>
            <td>{{ ticket.last_name }}</td>
            <td>{{ ticket.email }}</td>
            <td>{{ ticket.phone }}</td>
            <td>{{ ticket.description }}</td>
        </tr>
    </table>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '../styles/_variables'

</style>
