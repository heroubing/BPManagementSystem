import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import NotExist from '@/components/NotExist'
import Add from '@/components/BP/Add'
import Manage from '@/components/BP/Manage'
import Review from '@/components/Investor/Review'

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
      path: '/investor/review',
      name: 'Review',
      component: Review
    },
    {
      path: '*',
      // name: 'NotExist',
      // component: NotExist,
      redirect: '/home'
    }
  ]
})
