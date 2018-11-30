import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
// import User from '@/components/user/user.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/user/user.vue'
// 添加时间格式过滤器
import moment from 'moment'
Vue.filter('fmtData', (value, fmtString) => {
  return moment(value).format(fmtString)
})
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '/users',
      name: 'users',
      component: Users
    }]
  }]
})
