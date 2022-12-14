import { getYear, getMonth, getDate, getMinutes, differenceInMinutes, addMinutes } from 'date-fns'
export default class AvaibilitiesClass {
  constructor({
    recurrent = null, 
    startDate = null, 
    endDate = null, 
    customerDates = [], 
    companyDates = [], 
    matchingDays = [], 
    tickets = [],
    bookedTickets = []
  }) {
    
    this.recurrent = recurrent
    this.startDate = startDate
    this.endDate = endDate
    this.customerDates = customerDates
    this.companyDates = companyDates
    this.matchingDays = matchingDays
    this.tickets = tickets
    this.bookedTickets = bookedTickets
  }

  setBeginAndEndOfEachDay({fromHour = 0, fromMinute = 0, toHour = 0, toMinute = 0, d}) {
    const startInterval = new Date(getYear(d), getMonth(d), getDate(d), fromHour, fromMinute)
    const endInterval = new Date(getYear(d), getMonth(d), getDate(d), toHour, toMinute)
    return {
      startInterval: new Date(startInterval),
      endInterval: new Date(endInterval),
    }
  }

  addAvaibilities({fromHour, fromMinute, toHour, toMinute}) {
    if (this.recurrent) {
      for (let d = new Date(this.startDate); d <= this.endDate; d.setDate(d.getDate() + 1)) {
        this.companyDates.push(this.setBeginAndEndOfEachDay({fromHour, fromMinute, toHour, toMinute, d}))
      }
    } else {
      this.companyDates.push(this.setBeginAndEndOfEachDay({fromHour, fromMinute, toHour, toMinute, d: this.startDate}))
    }
    return this.companyDates
  }

  getCustomerDays() {
    for (let d = new Date(this.startDate); d <= this.endDate; d.setDate(d.getDate() + 1)) {
      this.customerDates.push(this.setBeginAndEndOfEachDay({d}))
    }
    return this.customerDates
  }

  getMatchingDays() {
    let result = []
    for (let i = 0; i < this.customerDates.length; i++) {
      const matchingDay = this.companyDates.find(el => {
        if(new Date(el.startInterval).setHours(0, 0, 0, 0) === new Date(this.customerDates[i].startInterval).setHours(0, 0, 0, 0)) {
          return {startInterval: el.startInterval, endInterval: el.endInterval}
        }
      })
      if (matchingDay) result.push(matchingDay)
    }
    this.matchingDays = result
    return this.matchingDays
  }

  getTickets() {
    let result = []
    if (this.matchingDays.length) {

      const startInterval = new Date(this.matchingDays[0].startInterval)
      const endInterval = new Date(this.matchingDays[this.matchingDays.length - 1].endInterval)
      
      const minutesLength = differenceInMinutes(
        startInterval,
        endInterval
      )

      let minutes = getMinutes(new Date(this.matchingDays[0].startInterval))
      for (let i = 0; i < this.matchingDays.length; i++) {

        let start = new Date(this.matchingDays[i].startInterval)
        const end = this.matchingDays[i].endInterval

        for (
          minutes;
          minutes <= Math.abs(minutesLength) && start < end;
          minutes += 30
        ) {

          const dateStart = start
          start = addMinutes(start, 30)

          if (this.bookedTickets.length) {
            const ticketIsNotBooked = !this.bookedTickets.find(el => this.bookedTickets.find(el => el.dateStart.getTime() === dateStart.getTime() && el.dateEnd.getTime() == start.getTime()))
            if (ticketIsNotBooked) {
              result.push({
                  dateStart,
                  dateEnd: start
                });
            }
          } else {
            result.push({
              dateStart,
              dateEnd: start
            });
          }
        }
      }
      return result
    } else {
      return [{dateStart: null}]
    }
  }

  byTicket(i) {
    this.tickets.splice(i, 1)
    return this.tickets
  }

  checkForAvaibilities(companyDates) {
    this.companyDates = companyDates
    this.getCustomerDays()
    this.getMatchingDays()
    return this.getTickets()
  }
}
