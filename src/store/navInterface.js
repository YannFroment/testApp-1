const navInterface = {
    namespaced: true,
    state: {
      companyInterface: true
    },
    getters: {
    },
    mutations: {
      m__toogleInferface(state) {
        state.companyInterface = !state.companyInterface
      }
    },
    actions: {
    },
    modules: {
    }
}
export default navInterface;
