<template>
  <div class="main-ct">
    <div class="header">
        <button v-on:click="logout()">Logout</button>
        <h1>Admin Console</h1>
        <p>Select a ticket and select a lawyer to send the ticket to the lawyer's email.</p>
    </div>

    <div class="tickets">
        <h2>Open Tickets</h2>

        <div v-on:click="selectTicket(ticket)" v-for="ticket in tickets.filter(x => !x.closed)" v-bind:key="ticket.id" class="ticket" v-bind:class="{ selected: selectedTicket && selectedTicket.id == ticket.id }">
            <h3>{{ ticket.first_name + ' ' + ticket.last_name }} - <a :href="'mailto:' + ticket.email">{{ ticket.email }}</a> - {{ ticket.phone }}</h3>
            <textarea name="description" v-model="ticket.description"></textarea>
        </div>
    </div>

    <div class="lawyers">
        <h2>Registered Lawyers</h2>

        <div v-on:click="selectLawyer(lawyer)" v-for="lawyer in lawyers.filter(x => x.verified)" v-bind:key="lawyer.id" class="lawyer" v-bind:class="{ selected: selectedLawyer && selectedLawyer.id == lawyer.id }">
            <h3>{{ lawyer.first_name + ' ' + lawyer.last_name }}</h3>
            <p><a :href="'mailto:' + lawyer.email">{{ lawyer.email }}</a> - {{ lawyer.phone }}</p>
        </div>

        <h2 class="pending">Pending Lawyers</h2>
        <div v-on:click="selectLawyer(lawyer)" v-for="lawyer in lawyers.filter(x => !x.verified)" v-bind:key="lawyer.id" class="lawyer" v-bind:class="{ selected: selectedLawyer && selectedLawyer.id == lawyer.id }">
            <h3>{{ lawyer.first_name + ' ' + lawyer.last_name }}</h3>
            <p><a :href="'mailto:' + lawyer.email">{{ lawyer.email }}</a> - {{ lawyer.phone }}</p>
        </div>
    </div>

    <div class="buttons">
        <h2>Actions</h2>
        <button v-on:click="submitTicket()" :disabled="loading" class="send">{{ sendTicketButton }}</button>
        <button v-on:click="deleteTicket()" :disabled="loading">{{ deleteTicketButton }}</button>
        <button v-on:click="deleteLawyer()" :disabled="loading">{{ deleteLawyerButton }}</button>
        <button v-on:click="approveLawyer()" :disabled="loading">{{ approveLawyerButton }}</button>
    </div>
  </div>
</template>

<script>
import { getTickets, submitTicket, deleteTicket, updateTicket } from '../../utils/ticket';
import { logout } from '../../utils/auth';
import { getLawyers, deleteLawyer, updateLawyer } from '../../utils/lawyer';

export default {
  name: 'Admin',
  created: function() {
      console.log("called");
      console.log(getTickets);
      getTickets()
        .then(res => {
            console.log(res);
            this.tickets = res.data;
        })
        .catch(err => {
            console.log(err);
        });
      getLawyers()
        .then(res => {
            console.log(res);
            this.lawyers = res.data;
        })
        .catch(err => {
            console.log(err);
        });
  },
  data () {
    return {
      selectedLawyer: {
        id: null
      },
      selectedTicket: {
        id: null
      },
      tickets: [
          {
            id: 0,
            first_name: 'please wait',
            last_name: 'loading tickets',
            email: '',
            phone: '',
            description: ''
        }
      ],
      lawyers: [
          {
            id: 0,
            first_name: 'please wait',
            last_name: 'loading lawyers',
            email: '',
            phone: '',
            verified: true
        }
      ],
      loading: false,
      sendTicketButton: 'Send Ticket to Lawyer',
      deleteTicketButton: 'Delete Selected Ticket',
      deleteLawyerButton: 'Delete Selected Lawyer',
      approveLawyerButton: 'Approve Selected Lawyer'
    }
  },
  methods: {
    logout: function() {
        logout();
        this.$router.push('/')
    },
    selectTicket: function(ticket) {
        this.selectedTicket = ticket;
    },
    selectLawyer: function(lawyer) {
        this.selectedLawyer = lawyer;
    },
    submitTicket: function() {
        if (!this.selectedTicket.id || !this.selectedLawyer.id) {
            alert("No ticket or lawyer selected.");
            return;
        }

        this.loading = true;
        this.sendTicketButton = 'Loading...';

        updateTicket(this.selectedTicket)
        .then(res => {
            submitTicket(this.selectedTicket, this.selectedLawyer)
                .then(res => {
                    this.sendTicketButton = 'Ticket Sent!';
                    this.selectedTicket.closed = true;
    
                    setTimeout(() => {
                        this.sendTicketButton = 'Send Ticket to Lawyer';
                    }, 5000);
                })
                .catch(err => {
                    console.log(err);
                    this.sendTicketButton = 'Error! (Please refresh)';
    
                    setTimeout(() => {
                        this.sendTicketButton = 'Send Ticket to Lawyer'
                    })
                });
        })
        .catch(err => {
            console.log(err);
            this.sendTicketButton = 'Error! (Please refresh)';
        });
    },
    deleteTicket: function() {
        if (!this.selectedTicket.id) {
            alert("No ticket selected.");
            return;
        }

        this.loading = true;
        this.deleteTicketButton = 'Loading...'
        deleteTicket(this.selectedTicket)
            .then(res => {
                this.loading = false;
                this.deleteTicketButton = 'Ticket Deleted!';
                this.tickets = this.tickets.filter(x => x.id !== this.selectedTicket.id);
                this.selectedTicket = { id: null };

                setTimeout(() => {
                    this.deleteTicketButton = 'Delete Selected Ticket';
                }, 5000);
            })
            .catch(err => {
                this.loading = false;
                console.log(err);
                this.deleteTicketButton = 'Error! (Please refresh)';
                
                setTimeout(() => {
                    this.deleteTicketButton = 'Delete Selected Ticket';
                }, 5000);
            });
    },
    deleteLawyer: function() {
        if (!this.selectedLawyer.id) {
            alert("No ticket selected.");
            return;
        }

        this.loading = true;
        this.deleteLawyerButton = 'Loading...'
        deleteLawyer(this.selectedLawyer)
            .then(res => {
                this.loading = false;
                this.deleteLawyerButton = 'Lawyer Deleted!';
                this.lawyers = this.lawyers.filter(x => x.id !== this.selectedLawyer.id);
                this.selectedLawyer = { id: null };

                setTimeout(() => {
                    this.deleteLawyerButton = 'Delete Selected Lawyer';
                }, 5000);
            })
            .catch(err => {
                console.log(err);
                this.loading = false;
                this.deleteLawyerButton = 'Error! (Please refresh)';
                
                setTimeout(() => {
                    this.deleteLawyerButton = 'Delete Selected Lawyer';
                }, 5000);
            });
    },
    approveLawyer: function() {
        if (!this.selectedLawyer.id) {
            alert("No lawyer selected.");
            return;
        }

        this.loading = true;
        this.approveLawyerButton = 'Loading...'
        this.selectedLawyer.verified = true;
        updateLawyer(this.selectedLawyer)
            .then(res => {
                this.loading = false;
                this.approveLawyerButton = 'Lawyer Approved!',
                this.selectedLawyer = { id: null };

                setTimeout(() => {
                    this.approveLawyerButton = 'Approve Selected Lawyer';
                }, 5000);
            })
            .catch(err => {
                this.loading = false;
                console.log(err);
                this.approveLawyerButton = 'Error! (Please Refresh)';
                
                setTimeout(() => {
                    this.approveLawyerButton = 'Approve Selected Lawyer';
                }, 5000);
            });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '../styles/_variables'

.buttons
    width: 15vw
    background-color: $mgj-primary
    height: 88vh
    float: left
    padding: 25px 20px

    .send
        margin-bottom: 200px

    button
        font-family: "Roboto"
        width: 100%
        text-align: center
        color: white
        border: 3px solid $mgj-secondary
        background-color: $mgj-primary
        margin-bottom: 20px
        padding: 15px 15px
        border-radius: 3px
        font-weight: 500

        &:hover
            cursor: pointer
            transform: scale(1.02)
            transition: all .2s ease
            background-color: $mgj-secondary

    h2
        font-family: "Roboto"
        font-size: 16px
        margin-bottom: 20px
        color: white
        font-weight: 500


.lawyers
    width: 35vw
    height: 88vh
    padding: 25px 50px
    float: left
    overflow-y: auto
    background-color: white

    .pending
        margin-top: 40px

    .lawyer
        border: 1px solid $mgj-primary
        padding: 20px 25px
        margin-top: 10px
        margin-bottom: 10px
        border-radius: 3px
        position: relative

        &:hover
            cursor: pointer
            transform: scale(1.03)
            transition: transform .1s ease
        
        &.selected
            padding-bottom: 50px

            &:after
                content: "lawyer selected"
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
                background-color: $mgj-primary

        h3
            font-family: "Roboto"
            font-weight: 500
            color: #333
            margin-bottom: 10px
        
        p
            font-family: "Roboto"
            font-size: 14px
            color: #555


    h2
        font-family: "Roboto"
        font-size: 16px
        margin-bottom: 20px
        color: #333
        font-weight: 500

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
            transform: scale(1.01)
            transition: transform .1s ease

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
