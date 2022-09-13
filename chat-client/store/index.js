

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);//vue的插件机制
import getters from './getters'
import user from './modules/user'
import system from './modules/system'
import friend from './modules/friend'
import message from './modules/message'
import emoji from './modules/emoji'
//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{//存放状态

    },
	mutations: {

	},
	actions: {

	},	
	modules: {
		user,
		system,
		friend,
		message,
		emoji
	},
	getters
})

export default store