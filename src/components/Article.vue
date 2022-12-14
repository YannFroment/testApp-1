<template>
  <div class="text-center">

      <div v-if="companyInterface && !addedAvaibilities" class="margin-bottom--20">
        <input @input="resetData()" type="checkbox" id="checkbox" v-model="recurrent">
        <label for="checkbox" class="margin-left--5">Recurrent</label>
      </div>

      <v-date-picker v-if="!addedAvaibilities" v-model='selectedDate' :is-range="isRange" :min-date="new Date()" />

      <div v-if="selectedDate && companyInterface">
        <p class="margin-top--20 margin-bottom--10" >From :</p>
        <div class="container-select">
          <v-select v-model="fromHour" placeholder="hour..." class="select-class" :options="[8,9,10,11,12,13,14,15,16,17,18]"></v-select>
          <v-select v-model="fromMinute" placeholder="minutes..." class="select-class" :options="[0,30]"></v-select>
        </div>

        <p class="margin-top--20 margin-bottom--10" >To :</p>
        <div  class="container-select">
          <v-select v-model="toHour" placeholder="hour..." class="select-class" :options="[8,9,10,11,12,13,14,15,16,17,18]"></v-select>
          <v-select v-model="toMinute" placeholder="minutes..." class="select-class" :options="[0,30]"></v-select>
        </div>
      </div>

      <div v-if="selectedDate" >
        <button v-if="companyInterface" @click="addAvaibilities()" class="btn-primary margin-top--20">Add avaibilities</button>
        <button v-else @click="checkForAvaibilities()" class="btn-primary margin-top--20">Check for avaibilities</button>
      </div>

      <div v-if="addedAvaibilities" class="font-bold margin-top--20">
        Now you can simulate a customer request on the <span @click="toogle()" class="link">customer interface !</span>
      </div>

      <div v-if="showCongratsMessage" tabindex="0" class="card margin-top--20 congrats">Thanks a lot, we're coming !</div>

      <div class="container-card margin-top--20">
        <div v-for="(ticket, i) in tickets" :key="i" class="card">
          <img v-if="ticket" src="@/assets/images/logo-elevator.png" class="logo-card" alt="logo" />
          <div @click="byTicket(ticket, i)" v-html="ticketSentence(ticket)" />
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Bus } from '@/modules/Bus.js';

import AvaibilitiesClass from '@/modules/AvaibilitiesClass.js';
export default {
    name: 'articleAvaibilities',
  data() {
    return {
      recurrent: false,
      selectedDate: null,
      fromHour: 8,
      fromMinute: 0,
      toHour: 18,
      toMinute: 0,
      addedAvaibilities: false,
      tickets: null,
      showCongratsMessage: false
    }
  },
  computed: {
    ...mapState('navInterface', ['companyInterface']),
    ...mapState('companyDates', ['companyDates', 'bookedTickets']),
    
    isRange() {
      return this.recurrent || !this.companyInterface
    }
  },
  methods: {
    ...mapMutations('navInterface', ['m__toogleInferface']),
    ...mapMutations('companyDates', ['m__addCompanyDates', 'm__addBookedTicket']),

    toogle() {
      this.m__toogleInferface()
      this.addedAvaibilities = false
    },

    ticketSentence(ticket) {
      if (ticket.dateStart === null) {
        return `Sorry, there's no window for the moment`
      } else {
        const dateStartEndMinute = new Date(ticket.dateStart).getMinutes() === 0 ? '' : new Date(ticket.dateStart).getMinutes()
        const dateEndEndMinute = new Date(ticket.dateEnd).getMinutes() === 0 ? '' : new Date(ticket.dateEnd).getMinutes()

        const dateStart = `${new Date(ticket.dateStart).toDateString()}<br> from ${new Date(ticket.dateStart).getHours()}h ${dateStartEndMinute}`
        const dateEnd = ` to ${new Date(ticket.dateEnd).getHours()}h ${dateEndEndMinute}`

        return dateStart + dateEnd
      }
    },

    byTicket(ticket, i) {
      if (ticket.dateStart !== null) {
        this.m__addBookedTicket({ticket})
        let avaibilities = new AvaibilitiesClass({
          recurrent: this.isRange, 
          startDate: this.selectedDate.start, 
          endDate: this.selectedDate.end,
          tickets: this.tickets,
          bookedTickets: this.bookedTickets
        })
        this.tickets = avaibilities.byTicket(i)
        this.showCongratsMessage = true
      }
    },

    addAvaibilities() {
      let avaibilities = null
      let result = []
      if (this.recurrent) {
        avaibilities = new AvaibilitiesClass({
          recurrent: this.isRange, 
          startDate: this.selectedDate.start, 
          endDate: this.selectedDate.end, 
          bookedTickets: this.bookedTickets
        })
        result = avaibilities.addAvaibilities({
          recurrent: this.recurrent,
          fromHour: this.fromHour,
          fromMinute: this.fromMinute,
          toHour: this.toHour,
          toMinute: this.toMinute
        })
      } else {
        avaibilities = new AvaibilitiesClass({
          recurrent: this.isRange, 
          startDate: this.selectedDate, 
          endDate: this.selectedDate, 
          bookedTickets: this.bookedTickets
        })
        result = avaibilities.addAvaibilities({
          recurrent: this.recurrent,
          fromHour: this.fromHour,
          fromMinute: this.fromMinute,
          toHour: this.toHour,
          toMinute: this.toMinute
        })
      }
      this.m__addCompanyDates({companyDates: result})
      this.resetData()
      this.addedAvaibilities = true
    },

    checkForAvaibilities() {
      let avaibilities = new AvaibilitiesClass({
        recurrent: this.isRange, 
        startDate: this.selectedDate.start, 
        endDate: this.selectedDate.end, 
        bookedTickets: this.bookedTickets
      })
      this.tickets = avaibilities.checkForAvaibilities(this.companyDates)
    },

    resetData() {
      this.selectedDate = null
      this.fromHour = 8
      this.fromMinute = 0
      this.toHour = 18
      this.toMinute = 0
      this.tickets = null
      this.showCongratsMessage = false
    },
  },

  mounted() {
    Bus.$on('resetDatepicker', () => {
      this.resetData()
    })
  },
};
</script>

<style scoped>
.link {
  text-decoration: underline;
  cursor: pointer;
}
.container-select {
  display: flex;
  width: 250px;
  justify-content: space-between;
  margin: 0 auto;
}
.select-class {
  width: 125px;
  margin: 5px;
}
.container-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  background: white;
  width: 250px;
  padding: 15px;
  margin: 5px;
  border: 3px dotted #8bc640;
  border-radius: 3px;
  cursor: pointer;
}

.logo-card {
  width: 65px
}
.congrats {
  margin: 20px auto;
  cursor: default !important;
}
</style>
