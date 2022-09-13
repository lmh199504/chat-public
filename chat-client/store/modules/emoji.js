import { reqEmojiList, reqDelEmoji, reqCreateEmoji, reqTopEmoji } from '@/api/emoji'
const state = {
	emojiList: [],
	isGet: false
}

const mutations = {
	SET_IS_GET: (state, boolean) => {
		state.isGet = boolean
	},
	SET_EMOJI_LIST: (state, list) => {
		state.emojiList = list
	},
	ADD_EMOJI: (state, emoji) => {
		state.emojiList.push(emoji)
	},
	DEL_EMOJI: (state, emojiId) => {
		const index = state.emojiList.findIndex(item => item._id == emojiId)
		state.emojiList.splice(index, 1)
	},
	SET_EMOJI_TOP: (state, id) => {
		const list = state.emojiList.map(item => {
			if (item._id == id) {
				item.update_time = Date.now()
			}
			return item
		}).sort((a, b) => b.update_time - a.update_time)
		state.emojiList = list
	}
}

const actions = {
	getEmoji({ commit }) {
		return new Promise((resolve, reject) => {
			reqEmojiList()
			.then(res => {
				commit('SET_EMOJI_LIST', res.data)
				commit('SET_IS_GET', true)
				resolve()
			})
			.catch(() => {
				reject()
			})
		})
	},
	delEmoji({ commit }, id) {
		return new Promise((resolve, reject) => {
			reqDelEmoji({ id: id })
			.then(res => {
				commit('DEL_EMOJI', id)
				resolve()
			})
			.catch(() => {
				reject()
			})
		})
	},
	addEmoji({ commit }, url) {
		return new Promise((resolve, reject) => {
			reqCreateEmoji({ url })
			.then(res => {
				commit('ADD_EMOJI', res.data)
				resolve()
			})
			.catch(() => {
				reject()
			})
		})
	},
	topEmoji({ commit }, id) {
		console.log(id)
		return new Promise((resolve, reject) => {
			reqTopEmoji({ id })
			.then(res => {
				commit('SET_EMOJI_TOP', id)
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

