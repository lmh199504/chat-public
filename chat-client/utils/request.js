import { baseURL } from "@/config/index"
import { getToken } from '@/utils/auth'

import store from '@/store'
function request(reqObj) {
	return new Promise((resolve, reject) => {
		const token = getToken()
		const defaultObj = {
			header: {
				...reqObj.header,
			},
			url: baseURL + reqObj.url,
			method: reqObj.method,
			data: reqObj.data
		}
		if (token) {
			defaultObj.header['authorization'] = token
		}
		uni.request({
			...defaultObj,
			success: (res) => {
				const code = res.data.code
				let msg = res.data.msg
				switch (code){
					case 0:
						resolve(res.data)
						break;
					case 403:
						uni.showToast({
							title: msg ? msg : '网络错误，稍后再试~',
							icon: 'none'
						})
						reject(msg)
						break	
					case 401:
						// 没有登录
						store.dispatch('user/resetUserInfo')
						uni.showToast({
							title: msg ? msg : '网络错误，稍后再试~',
							icon: 'none'
						})
						reject('未登录')
						break
					case 500:
						uni.showToast({
							title: msg ? msg : '网络错误，稍后再试~',
							icon: 'none'
						})
						reject(msg)
						break
					default:
						uni.showToast({
							title: msg ? msg : '网络错误，稍后再试~',
							icon: 'none'
						})
						reject(res.data)
						break;
				}
			},
			fail: (err) => {
				uni.showToast({
					title: '网络错误，稍后再试~',
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}
export default request