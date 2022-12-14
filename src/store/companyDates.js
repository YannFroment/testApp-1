const companyDates = {
  namespaced: true,
  state: {
    companyDates: [],
    bookedTickets: [],
    startDate: null,
    endDate: null,
  },
  getters: {
  },
  mutations: {
    m__addCompanyDates(state, {companyDates}) {
      state.companyDates = [...companyDates]
    },
    m__addBookedTicket(state, {ticket}) {
      state.bookedTickets.push(ticket)
    },
  },
  actions: {
  },
  modules: {
  }
}
export default companyDates;
