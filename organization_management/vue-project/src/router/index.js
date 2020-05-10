import Vue from 'vue'
import Router from 'vue-router'
import Constant from '@/utils/Constant'
import Utils from '@/utils/Utils'
import API from '@/utils/API'
import {MessageBox, Notification} from 'element-ui'
import Home from '@/components/Home'
import UserGroup from '@/components/UserGroup/Manage'
import InvestmentUser from '@/components/InvestmentUser/Manage'
import Project from '@/components/Project/Manage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: Constant.publicPath,
  routes: [
    {path: '/home', name: 'Home', component: Home},
    {path: '/userGroup/manage', name: 'UserGroup', component: UserGroup},
    {path: '/investmentUser/manage', name: 'InvestmentUser', component: InvestmentUser},
    {path: '/project/manage', name: 'Project', component: Project},
    {path: '*', redirect: '/home'}
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to, from)
  Utils.getInfo(API.SYS_permission, {keys: 'common.frontend_organization_management'}).then(({result}) => {
    if (result && result.authenticated) {
      if (result.permissions && result.permissions['common.frontend_organization_management']) {
        next()
      } else {
        Notification.error({
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
