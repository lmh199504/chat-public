import request from '@/utils/request'

/* 搜索好友 */
export const reqSearchFriend = (data) => request({
	url: '/friend/search',
	method: 'GET',
	data
})

/* 发送好友请求 */
export const reqSendFriendRequest = (data) => request({
	url: '/friend/rquest',
	method: 'POST',
	data
})

/* 好友请求列表 */
export const reqRequestList = (data) => request({
	url: '/friend/rquestList',
	method: 'GET',
	data
})
/* 处理好友请求 */
export const dealRequest = (data) => request({
	url: '/friend/dealRequest',
	method: 'POST',
	data
})
/* 更新已读状态 */
export const reqReadRequest = () => request({
	url: '/friend/updateRequest',
	method: 'POST'
})
/* 获取好友列表 */
export const reqFriendList = () => request({
	url: '/friend/friendList',
	method: 'GET'
})