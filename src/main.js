import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VueSelect from 'vue-select'
import http from './resource'
import nprogress from './nprogress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { Card } from 'bootstrap-vue/es/components'

Vue.component('v-select', VueSelect)
Vue.component('b-card', Card)
Vue.use(Vuelidate)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  http,
  router,
  store,
  nprogress,
  render: h => h(App)
}).$mount('#app')
