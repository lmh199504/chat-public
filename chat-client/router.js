// router.js
import {RouterMount,createRouter} from 'uni-simple-router';
import store from '@/store'
import { getToken } from '@/utils/auth'
import { connectSocket } from '@/socket'
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routerErrorEach:({type,level,...args})=>{
		console.log({type,level,...args})
		// #ifdef APP-PLUS
		if(type===3){
			router.$lockStatus=false;
			const pages=getCurrentPages();
			const {$vm}=pages[pages.length-1];
			$vm.runtimeQuit();
		}
		// #endif
	},
	routes: [...ROUTES]
});
const whiteList = [
	'/pages/login/login',
	'/pages/register/register',
	// #ifdef APP-PLUS
	'/pages/index/index',
	// #endif
]

//全局路由前置守卫
router.beforeEach(async (to, from, next) => {
	try{
		const token = getToken()
		connectSocket()
		if (token) {
			/* 获取用户信息 */
			if (!store.state.user.userId) {
				await store.dispatch('user/getInfo')
			}
			/* 获取会话列表 */
			if (!store.state.message.conversationList.length) {
				store.dispatch('message/getConversationList')
			}
			/* 获取好友列表 */
			if (!store.state.friend.friendList.length) {
				store.dispatch('friend/getFriendList')
			}
			/* 好友请求列表 */
			if (!store.state.friend.requestList.length) {
				store.dispatch('friend/getList')
			}
			/* 获取表情包 */
			if (!store.state.emoji.isGet) {
				store.dispatch('emoji/getEmoji')
			}
			next();
		} else if (whiteList.includes(to.path)) {
			next()
		} else if (!token) {
			next({ path: '/pages/login/login' })
		} else {
			next();
		}
	}catch(e){
		next();
	}
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	
})
export {
	router,
	RouterMount
}