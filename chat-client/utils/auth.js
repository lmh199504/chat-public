
const tokenKey = 'token'
const userInfoKey = 'userInfo'
const pass_key = 'passkey'

// token
export const setToken = (token) => {
	uni.setStorageSync(tokenKey, token)
}
export const removeToken = () => {
	uni.removeStorageSync(tokenKey)
}
export const getToken = () => {
	const data = uni.getStorageSync(tokenKey)
	return data ? data : ''
}



// 用户信息
export const setUserInfo = (info) => {
	uni.setStorageSync(userInfoKey, info)
}
export const removeUserInfo = () => {
	uni.removeStorageSync(userInfoKey)
}
export const getUserInfo = () => {
	const data = uni.getStorageSync(userInfoKey)
	return data ? data : {}
}

// 账号密码
export const setPass = (data) => {
	uni.setStorageSync(pass_key, data)
}
export const removePass = () => {
	uni.removeStorageSync(pass_key)
}
export const getPass = () => {
	const data = uni.getStorageSync(pass_key)
	return data ? data : {}
}