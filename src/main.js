import Vue from 'vue'
import App from './App'
import fly from './utils/fly'
import api from './utils/api'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

// 挂载flyio第三方请求
Vue.prototype.$fly = fly;
Vue.prototype.$fly.interceptors.request.use((config, promise) => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
})
// 挂载api接口地址
Vue.prototype.$api = api;
// 全局变量
Vue.prototype.globalData = getApp().globalData



