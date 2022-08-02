
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

$http.beforeRequest = function(options){
	uni.showLoading({
		title:"数据加载中"
	})
}
$http.afterRequest = function(){
	uni.hideLoading()
}

//配置当加载数据失败时候的提示
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif