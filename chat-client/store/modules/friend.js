import { reqRequestList, reqFriendList } from '@/api/friend'
import ConvertPinyin from '@/utils/covertPinyin'
const state = {
	friendNum: 0,
	unread: 0, // 好友请求未读
	friendList: [],
	requestList: []
}

const mutations = {
	// 设置好友请求列表
	SET_REQUEST_LIST: (state, list) => {
		state.requestList = list
	},
	// 好友数量
	SET_FRIEND_NUM(state, friendNum) {
		state.friendNum = friendNum
	},
	// 设置未读请求
	SET_UNREAD(state, unread) {
		if (unread != undefined) {
			state.unread = unread
		}
		/* 设置菜单未读消息 */
		if (state.unread) {
			uni.setTabBarBadge({
				index: 1,
				text: state.unread + ''
			})
		} else {
			uni.removeTabBarBadge({
				index: 1
			})
		}
	},
	// 好友列表
	SET_FRIEND_LIST(state, list) {
		state.friendList = list
	}
}

const actions = {
	getList({ commit }) {
		return new Promise((resolve, reject) => {
			reqRequestList()
			.then(res => {
				commit('SET_UNREAD', res.data.unread)
				resolve()
			}) 
			.catch(() => {
				reject()
			})
		})
	},
	getFriendList({ commit }) {
		return new Promise((resolve, reject) => {
			reqFriendList()
			.then(res => {
				commit('SET_FRIEND_NUM', res.data.length)
				const list = res.data.reduce((pre, cur) => {
					const name = cur.remarkName || cur.username
					const letter = ConvertPinyin(name).toLocaleUpperCase() || '#'
					const index = pre.findIndex(item => item.letter === letter)
					if (index > -1) { // 已经存在该字母
						pre[index].list.push(cur)
					} else {
						pre.push({
							letter: letter,
							list: [{ ...cur }]
						})
					}
					return pre
				}, []).sort((a, b) => {
					if (a.letter > b.letter) {
						return 1
					} else {
						return -1
					}
				})
				commit('SET_FRIEND_LIST', list)
				
				resolve()
			})
			.catch(() => {
				reject()
			})
		})
	}
}

export default{
	namespaced: true,
	state,
	mutations,
	actions
}

