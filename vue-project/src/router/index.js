import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Add from '@/components/BP/Add'
import Manage from '@/components/BP/Manage'
import NotExist from '@/components/NotExist'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/bp/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/bp/manage',
      name: 'Manage',
      component: Manage
    },
    {
      path: '*',
      name: 'NotExist',
      component: NotExist
    }
  ]
})
