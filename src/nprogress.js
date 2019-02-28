import NProgress from 'vue-nprogress'
import Vue from 'vue'

Vue.use(NProgress, {
    router: true,
    http: true,
    color: '#0000000'
})

const nprogress = new NProgress()

export default nprogress