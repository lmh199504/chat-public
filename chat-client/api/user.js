import request from '@/utils/request'

export const reqLogin = (data) => request({
	url: '/user/login',
	method: 'POST',
	data
})
// 注册
export const reqRegister = (data) => request({
	url: '/user/register',
	method: 'POST',
	data
})
// 获取用户信息
export const reqGetInfo = () => request({
	url: '/user/info',
	method: 'GET'
})
// 通过id查找用户信息
export const reqInfoById = (data) => request({
	url: '/user/infoById',
	method: 'GET',
	data
})
// 更新头像
export const reqUpdateAvatar = (data) => request({
	url: '/user/avatar',
	method: 'POST',
	data
})
// 更新背景
export const reqUpdateBack = (data) => request({
	url: '/user/updateBackground',
	method: 'POST',
	data
})
// 更新昵称
export const reqUpdateName = (data) => request({
	url: '/user/updateName',
	method: 'POST',
	data
})
// 更新签名
export const reqUpdateSign = (data) => request({
	url: '/user/updateSign',
	method: 'POST',
	data
})