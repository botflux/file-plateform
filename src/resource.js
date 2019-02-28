import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)

Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://stark-cove-46870.herokuapp.com/'
// Vue.http.interceptors.before = (request, next) => {
//     // NProgress.start()

//     next(response => {
//         // NProgress.done()
//     })
// }

export default {
    root: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://stark-cove-46870.herokuapp.com/'
}