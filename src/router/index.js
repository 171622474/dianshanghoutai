import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/user/user.vue'
import Rights from '@/components/rights/rights/rights.vue'
import Roles from '@/components/rights/roles/roles.vue'
// 添加时间格式过滤器
import moment from 'moment'
Vue.filter('fmtData', (value, fmtString) => {
  return moment(value).format(fmtString)
})

const router = new Router({
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
    }, {
      path: '/rights',
      name: 'rights',
      component: Rights
    }, {
      path: '/roles',
      name: 'roles',
      component: Roles
    }]
  }]
})

Vue.use(Router)
export default router

// // 设置请求头
// const AUTH_TOKEN = localStorage.getItem('token')
// this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
