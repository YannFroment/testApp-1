import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store/index.js'
import navInterface from './store/navInterface.js'
import companyDates from './store/companyDates.js'


store.registerModule('navInterface', navInterface)
store.registerModule('companyDates', companyDates)

import './styles/button.css'
import './styles/font.css'
import './styles/reset.css'
import './styles/template.css'
import './styles/helpers.css'

import VCalendar from 'v-calendar';
Vue.use(VCalendar);

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
