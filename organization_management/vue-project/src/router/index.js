import Vue from 'vue'
import Router from 'vue-router'
import Constant from '@/utils/Constant'
import Home from '@/components/Home'
import UserGroup from '@/components/UserGroup/Manage'
import InvestmentUser from '@/components/InvestmentUser/Manage'
import Project from '@/components/Project/Manage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: Constant.publicPath,
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/userGroup/manage',
      name: 'UserGroup',
      component: UserGroup
    },
    {
      path: '/investmentUser/manage',
      name: 'InvestmentUser',
      component: InvestmentUser
    },
    {
      path: '/project/manage',
      name: 'Project',
      component: Project
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
