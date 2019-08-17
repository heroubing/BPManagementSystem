import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import InvestmentManage from '@/components/Investment/Manage'

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
      path: '/investment/manage',
      name: 'Investment',
      component: InvestmentManage
    },
    {
      path: '*',
      // name: 'NotExist',
      // component: NotExist,
      redirect: '/home'
    }
  ]
})
