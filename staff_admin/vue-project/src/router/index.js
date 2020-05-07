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
import InvestmentManage from '@/components/Investment/Manage'
import UserGroup from '@/components/UserGroup/Manage'
import User from '@/components/User/Manage'
import Utils from '@/utils/Utils'
import API from '@/utils/API'
import {MessageBox} from 'element-ui'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: Constant.publicPath,
  routes: [
    {path: '/home', name: 'Home', component: Home},
    {path: '/bp/add', name: 'BpAdd', component: BpAdd},
    {path: '/bp/manage', name: 'BpManage', component: BpManage},
    {path: '/bp/industry/manage', name: 'IndustryManage', component: IndustryManage},
    {path: '/bp/round/manage', name: 'RoundManage', component: RoundManage},
    {path: '/investor/review', name: 'InvestorReview', component: InvestorReview},
    {path: '/learning/manage', name: 'LearningManage', component: LearningManage},
    {path: '/ads/manage', name: 'AdsManage', component: AdsManage},
    {path: '/projectContact/manage', name: 'ProjectContact', component: ProjectContactManage},
    {path: '/investment/manage', name: 'Investment', component: InvestmentManage},
    {path: '/userGroup/manage', name: 'UserGroup', component: UserGroup},
    {path: '/user/manage', name: 'User', component: User},
    {path: '*', redirect: '/home'}
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to, from)
  Utils.getInfo(API.SYS_permission, {keys: 'core.frontend_staff_admin'}).then(({result}) => {
    if (result && result.authenticated) {
      if (result.permissions && result.permissions['core.frontend_staff_admin']) {
        next()
      } else {
        this.$notify.error({
          title: '错误',
          message: Constant.AJAX_ERROR_NO_AUTH
        })
        this.handleVerfClick()
        this.captcha = ''
      }
    } else {
      MessageBox.alert(
        Constant.AJAX_ERROR_NO_AUTH_LOGIN,
        '访问失败',
        {
          type: 'error',
          showClose: false,
          callback: function () {
            window.top.location.href = `${window.location.origin}${Constant.publicPath}/login.html`
          }
        })
    }
  })
})
export default router
