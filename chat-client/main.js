import App from './App'
import Vue from 'vue'
import store from '@/store'
import uView from '@/uni_modules/uview-ui'
import mixins from '@/mixins/index'
import {router,RouterMount} from './router.js'  //路径换成自己的
Vue.use(uView)
Vue.use(router)
Vue.mixin(mixins)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app,router,'#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

