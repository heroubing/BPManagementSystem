// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 阻止promise继续链式下去
Promise.stop = function () {
  return new Promise(function () {
  })
}

// 全局loading状态
window.LOADING_STS = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
