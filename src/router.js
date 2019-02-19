import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/character-checker',
      name: 'character-checker',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/character-checker/index.vue')
    }, {
      path: '/csv-to-xml',
      component: () => import('./views/csv-to-xml/index.vue'),
      children: [
        {
          path: '',
          name: 'csv-to-xml',
          component: () => import('./views/csv-to-xml/start.vue')
        }, {
          path: 'file',
          name: 'csv-to-xml-file',
          component: () => import('./views/csv-to-xml/file.vue')
        }, {
          path: 'map',
          name: 'csv-to-xml-map',
          component: () => import('./views/csv-to-xml/map.vue')
        }, {
          path: 'root',
          name: 'csv-to-xml-root',
          component: () => import('./views/csv-to-xml/root.vue')
        }
      ]
    }
  ]
})
