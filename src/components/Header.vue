<template>
  <div id="header-container">
    <img id="logo" src="@/assets/images/logo-elevator.png" alt="logo">
    <div v-if="companyInterface" class="welcome-text">Welcome ! Select one or multiple dates to open windows</div>
    <div v-if="companyInterface" class="top-right" @click="toogle()">Go to customer interface</div>
    <div v-if="!companyInterface" class="welcome-text">Welcome ! Select a date range to book an intervention</div>
    <div v-if="!companyInterface" class="top-right" @click="toogle()">Go to company interface</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Bus } from '@/modules/Bus.js';

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState('navInterface', ['companyInterface'])
  },
  methods: {
    ...mapMutations('navInterface', ['m__toogleInferface']),
    toogle() {
      this.m__toogleInferface()
      Bus.$emit('resetDatepicker')
    }
  }

}
</script>

<style scoped>
  #header-container {
    display: flex;
    align-items: center;
  }
  #logo {
    width: 140px
  }
  .welcome-text {
    font-size: 31px;
    color: #79b32b;
    font-weight: bold;
    margin: 0 auto;
  }
  .top-right {
    position: absolute;
    right: 10px;
    top: 10px;
    text-decoration: underline;
    cursor: pointer;
  }

</style>
