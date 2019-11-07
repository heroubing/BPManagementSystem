import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import InvestmentManage from '@/components/Investment/Manage'
import UserGroup from '@/components/UserGroup/Manage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/org_manage',
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
      path: '/userGroup/manage',
      name: 'UserGroup',
      component: UserGroup
    },
    {
      path: '*',
      // name: 'NotExist',
      // component: NotExist,
      redirect: '/home'
    }
  ]
})
