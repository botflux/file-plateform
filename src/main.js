import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/js/bootstrap'
import 'jquery'
import 'popper.js'
import Vuelidate from 'vuelidate'
import VueSelect from 'vue-select'

Vue.component('v-select', VueSelect)

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
