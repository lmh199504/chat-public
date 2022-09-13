
import request from '@/utils/request'
/* 获取会话列表 */
export const reqConversationList = () => request({
	url: '/conversation/list',
	method: 'GET'
})
/* 会话已读 */
export const reqReadMsg = (data) => request({
	url: '/conversation/readMsg',
	method: 'POST',
	data
})
/* 获取历史消息 */
export const reqGetMessage = (data) => request({
	url: '/conversation/getMessage',
	method: 'POST',
	data
})