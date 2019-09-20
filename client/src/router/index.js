import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Donate from '@/components/Donate'
import Error from '@/components/Error'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/page=:id',
      name: 'Dashboard',
      component: Dashboard,
      props: true
    },
    {
      path: '/donate',
      name: 'Donate',
      component: Donate
    },
    {
    	path: "*",
    	component: Error
    }
  ]
})
