// 引入axios
import axios from 'axios'
// 创建空对象
const http = {}
// 必须添加方法
http.install = function (Vue) {
  Vue.prototype.$http = axios
}
