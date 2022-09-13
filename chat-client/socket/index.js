import {
	websocketUrl
} from '@/config'
import {
	getToken
} from '@/utils/auth'
import handleMessage from './handleMessage'


export const connectSocket = (function() {
	let instance = null
	return function getSocket(server) {
		if (instance) return instance
		const token = getToken()
		if (token) {
			instance = uni.connectSocket({
				url: websocketUrl + '?token=' + token,
				success() {}
			});
			/* 连接错误 */
			instance.onError(err => {
				instance = null
				reConnectSocket()
			})
			/* 连接关闭 */
			instance.onClose(() => {
				console.log('已关闭连接')
				instance = null
				reConnectSocket()
			})
			/* 接收消息 */
			instance.onMessage(handleMessage)
			/* 连接打开 */
			instance.onOpen(() => {
				console.log('已打开websocket')
			})
		}
		return instance
	}
})()

// 重新连接
const reConnectSocket = debounce(connectSocket, 500)
// 防抖
function debounce(fn, wait) {
	var timer = null
	return function() {
		if (timer !== null) {
			clearTimeout(timer)
		}
		timer = setTimeout(fn, wait)
	}
}
