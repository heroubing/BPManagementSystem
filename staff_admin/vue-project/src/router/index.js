import Vue from 'vue'
import Router from 'vue-router'
import Constant from '@/utils/Constant'
import Home from '@/components/Home'
import BpAdd from '@/components/BP/Add'
import BpManage from '@/components/BP/Manage'
import IndustryManage from '@/components/BP/Industry/Manage'
import RoundManage from '@/components/BP/Round/Manage'
import InvestorReview from '@/components/Investor/Review'
import LearningManage from '@/components/Learning/Manage'
import AdsManage from '@/components/Ads/Manage'
import ProjectContactManage from '@/components/ProjectContact/Manage'

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
      path: '/bp/add',
      name: 'BpAdd',
      component: BpAdd
    },
    {
      path: '/bp/manage',
      name: 'BpManage',
      component: BpManage
    },
    {
      path: '/bp/industry/manage',
      name: 'IndustryManage',
      component: IndustryManage
    },
    {
      path: '/bp/round/manage',
      name: 'RoundManage',
      component: RoundManage
    },
    {
      path: '/investor/review',
      name: 'InvestorReview',
      component: InvestorReview
    },
    {
      path: '/learning/manage',
      name: 'LearningManage',
      component: LearningManage
    },
    {
      path: '/ads/manage',
      name: 'AdsManage',
      component: AdsManage
    },
    {
      path: '/projectContact/manage',
      name: 'ProjectContact',
      component: ProjectContactManage
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
