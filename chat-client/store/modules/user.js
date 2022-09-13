
import { setToken, removeToken, getToken } from '@/utils/auth'
import { reqLogin, reqGetInfo, reqRegister, reqUpdateAvatar, reqUpdateBack } from '@/api/user'

const state = {
	token: getToken(),
	userInfo: {
		
	},
	nickName: '',
	userId: ''
}

const mutations = {
	SET_TOKEN(state, token) {
		state.token = token
	},
	SET_INFO(state, info) {
		state.userInfo = info
	},
	SET_USER_ID(state, userId) {
		state.userId = userId
	},
	SER_NICK_NAME(state, nickName) {
		state.nickName = nickName
	},
	SET_AVATAR: (state, url) => {
		state.userInfo.avatar = url
	}
}

const actions = {
	login({ commit }, data) {
		return new Promise((resolve, reject) => {
			reqLogin({
				password: data.password,
				account: data.account
			})
			.then(res => {
				commit('SET_TOKEN', res.data)
				setToken(res.data)
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	resetUserInfo({ commit }) {
		commit('SET_TOKEN', '')
		commit('SET_INFO', {})
		commit('SET_USER_ID', '')
		commit('SER_NICK_NAME', '')
		removeToken()
	},
	getInfo({ commit }) {
		return new Promise((resolve, reject) => {
			reqGetInfo()
			.then(res => {
				commit('SET_INFO', res.data)
				commit('SET_USER_ID', res.data.id)
				commit('SER_NICK_NAME', res.data.username)
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
		})
	},
	regiter({ commit }, data) {
		return new Promise((resolve, reject) => {
			reqRegister(data)
			.then(res => {
				commit('SET_TOKEN', res.data)
				setToken(res.data)
				resolve(res)
			})
			.catch(() => {
				reject()
			})
		})
	},
	updateAvatar({ commit }, url) {
		return new Promise((resolve, reject) => {
			reqUpdateAvatar({ url })
			.then(res => {
				commit('SET_AVATAR', url)
				resolve()
			})
			.catch(() => {
				reject()
			})
		})
	},
	updateBackground({ dispatch }, url) {
		return new Promise((resolve, reject) => {
			reqUpdateBack({ url })
			.then(() => {
				dispatch('getInfo')
				.then(() => {
					resolve()
				})
				.catch(() => {
					reject()
				})
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
