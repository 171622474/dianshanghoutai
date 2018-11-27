// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入Element-ui 框架
import ElementUI from 'element-ui'
// 引入Element-ui css文件
import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义basecss文件
import './assets/base.css'
// Vue.config.productionTip = false
// 挂载注册插件
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
