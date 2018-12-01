// 引入axios
import axios from 'axios'
// 创建空对象
const http = {}
// 必须添加方法
http.install = function (Vue) {
  const AUTH_TOKEN = localStorage.getItem('token')
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  Vue.prototype.$http = axios
}

export default http
