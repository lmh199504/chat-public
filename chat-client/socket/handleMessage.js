// 处理消息
import store from '@/store'
import MsgType from './msgType'
import BaseCode from '@/utils/baseCode'
function handleMessage(res) {
	try{
		const parseData = JSON.parse(res.data)
		if (parseData.msgType == MsgType.system) { // 消息类型 系统消息
			const systemMsg = parseData.msg
			const systemMsgType = systemMsg.msgType
			if (systemMsg.code == BaseCode.TOKEN_OUT) { // 消息状态 token 过期
				store.dispatch('user/resetUserInfo')
			} else if (systemMsg.code == BaseCode.SUCCESS) { // 成功
				if (systemMsgType == MsgType.request) {
					console.log(systemMsg.msg)
					// #ifdef APP-PLUS
					uni.vibrate()
					// #endif
					uni.showModal({
						title: '好友请求',
						confirmText: '知道了',
						content: systemMsg.msg
					})
					store.dispatch('friend/getList')
				} else if (systemMsgType == MsgType.agree) {
					playTipMedia()
					uni.showModal({
						title: '对方同意',
						confirmText: '知道了',
						content: systemMsg.msg
					})
				}
			}
		} else if (parseData.msgType == MsgType.text) { // 文本消息
			if (parseData.data.from != store.state.user.userId) {
				uni.showToast({
					title: '收到一条新消息',
					icon: 'none'
				})
				playTipMedia()
			}
			store.dispatch('message/updateConversationMessage', parseData.data)
		} else if (parseData.msgType == MsgType.image) { // 图片消息
			
			if (parseData.data.from != store.state.user.userId) {
				uni.showToast({
					title: '收到一条新消息',
					icon: 'none'
				})
				playTipMedia()
			}
			store.dispatch('message/updateConversationMessage', parseData.data)
		} else if (parseData.msgType == MsgType.sound) { // 声音消息
			if (parseData.data.from != store.state.user.userId) {
				uni.showToast({
					title: '收到一条新消息',
					icon: 'none'
				})
				playTipMedia()
			}
			store.dispatch('message/updateConversationMessage', parseData.data)
		} else if (parseData.msgType == MsgType.file) { // 文件消息
			if (parseData.data.from != store.state.user.userId) {
				uni.showToast({
					title: '收到一条新消息',
					icon: 'none'
				})
				playTipMedia()
			}
			store.dispatch('message/updateConversationMessage', parseData.data)
		} else if (parseData.msgType == MsgType.video) { // 视频消息
			if (parseData.data.from != store.state.user.userId) {
				uni.showToast({
					title: '收到一条新消息',
					icon: 'none'
				})
				playTipMedia()
			}
			store.dispatch('message/updateConversationMessage', parseData.data)
		} else if (parseData.msgType == MsgType.notFriend) {
			if (parseData.data.from != store.state.user.userId) {
				uni.showToast({
					title: '收到一条新消息',
					icon: 'none'
				})
				playTipMedia()
			}
			store.dispatch('message/updateConversationMessage', parseData.data)
		}
		
	}catch(e){
		console.log(e)
	}
}


const innerAudioContext = uni.createInnerAudioContext()
// #ifdef MP-WEIXIN
const tipMusic = 'https://reactlmh.oss-cn-beijing.aliyuncs.com/chatfiles/tipsmusic/msg-tip.mp3'
// #endif
// #ifndef MP-WEIXIN
const tipMusic = require('../static/media/msg-tip.mp3')
// #endif
function playTipMedia() {
	// #ifdef H5
	innerAudioContext.currentTime = 0
	innerAudioContext.autoplay = false;
	innerAudioContext.src = tipMusic
	innerAudioContext.play()
	// #endif
	// #ifndef H5
	const bgAudioManager = uni.getBackgroundAudioManager()
	bgAudioManager.title = '哈哈哈'
	bgAudioManager.singer = '暂无'
	bgAudioManager.coverImgUrl = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png'
	bgAudioManager.src = tipMusic
	bgAudioManager.play()
	// #endif
}

export default handleMessage