import { reqConversationList, reqReadMsg } from '@/api/conversation'
const innerAudioContext = uni.createInnerAudioContext()
const state = {
	// 会话列表
	conversationList: [],
	curConversationId: undefined,
	allUnReadCount: 0,
	recordId: ''
}

const mutations = {
	// 设置会话列表
	SET_CONVERSATION_LIST: (state, list) => {
		state.conversationList = list
	},
	// 设置当前会话id
	SET_CUR_CONVERSATION_ID: (state, conversation_id) => {
		state.curConversationId = conversation_id
	},
	// 设置会话已读
	SET_READ_CONVERSATION: (state, conversation_id) => {
		const list = state.conversationList.map(item => {
			if (item.conversation_id == conversation_id) {
				item.unreadCount = 0
			}
			return item
		})
		state.conversationList = list
	},
	SET_ALL_UN_READ: (state) => {
		const num = state.conversationList.reduce((pre, cur) => {
			return pre + (cur.unreadCount ? cur.unreadCount : 0)
		}, 0)
		if (num) {
			uni.setTabBarBadge({
				index: 0,
				text: num + ''
			})
		} else {
			uni.removeTabBarBadge({
				index: 0
			})
		}
		state.allUnReadCount = num
	},
	// 更新会话消息内容
	UPDATE_CONVERSATION: (state, message) => {
		state.conversationList.forEach(item => {
			if (item.conversation_id == message.conversation_id) {
				if (!item.unreadCount) {
					item.unreadCount = 0
				}
				item.unreadCount = item.unreadCount + 1
				item.messages.unshift(message)
				item.message = message
				item.update_time = Date.now()
			}
		})
	},
	// 当前播放语音id
	SET_RECORD_ID: (state, id) => {
		state.recordId = id
	}
}

const actions = {
	getConversationList({ commit }) {
		return new Promise((resolve, reject) => {
			reqConversationList()
			.then(res => {
				const list = res.data.rows.map(item => {
					if (!item.unreadCount) {
						item.unreadCount = 0
					}
					return item
				})
				commit('SET_CONVERSATION_LIST', list)
				commit('SET_ALL_UN_READ')
				resolve()
			})
			.catch(() => {
				reject()
			})
		})
	},
	readMsg({ commit },conversation_id) {
		return new Promise((resolve, reject) => {
			reqReadMsg({ conversation_id })
			.then(() => {
				commit('SET_READ_CONVERSATION', conversation_id)
				commit('SET_ALL_UN_READ')
				resolve()
			})
			.catch(() => {
				reject()
			})
		})
	},
	/**
	 * 更新会话消息
	 * @@param {message} 一条新消息   
	 */
	async updateConversationMessage({ dispatch, commit, state: { conversationList } }, message) {
		const index = conversationList.findIndex(item => item.conversation_id === message.conversation_id)
		if (index > -1) { // 存在会话
			commit('UPDATE_CONVERSATION', message)
		} else { // 不存在会话
			dispatch('getConversationList')
		}
		commit('SET_ALL_UN_READ')
	},
	playRecord({ commit }, data) {
		console.log(data)
		// #ifdef H5
		innerAudioContext.currentTime = 0
		innerAudioContext.autoplay = false;
		innerAudioContext.src = data.url
		innerAudioContext.play()
		innerAudioContext.onEnded(() => {
			commit('SET_RECORD_ID', '')
		})
		innerAudioContext.onError(() => {
			uni.showToast({
				title: '播放失败',
				icon: 'error'
			})
			commit('SET_RECORD_ID', '')
		})
		commit('SET_RECORD_ID', data.msg_id)
		// #endif
		// #ifndef H5
		const bgAudioManager = uni.getBackgroundAudioManager()
		bgAudioManager.title = '录音'
		bgAudioManager.singer = '暂无'
		bgAudioManager.coverImgUrl = ''
		bgAudioManager.src = data.url
		bgAudioManager.play()
		commit('SET_RECORD_ID', data.msg_id)
		bgAudioManager.onEnded(() => {
			console.log('end')
			commit('SET_RECORD_ID', '')
		})
		bgAudioManager.onError(() => {
			uni.showToast({
				title: '播放失败',
				icon: 'error'
			})
			commit('SET_RECORD_ID', '')
		})
		// #endif
	}
}

export default{
	namespaced: true,
	state,
	mutations,
	actions
}

