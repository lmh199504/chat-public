import request from '@/utils/request'

// 发送评论
export const reqSendComment = (data) => request({
	url: '/commnet/sendComment',
	method: 'POST',
	data
})
// 获取评论
export const reqComment = (data) => request({
	url: '/comment/getComment',
	method: 'GET',
	data
}) 
// 点赞
export const reqLikeDynamic = (data) => request({
	url: '/dynamic/like',
	method: 'POST',
	data
})