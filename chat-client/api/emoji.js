import request from '@/utils/request'

// 新建表情包
export const reqCreateEmoji = (data) => request({
	url: '/emoji/create',
	method: 'POST',
	data
})
// 获取表情包
export const reqEmojiList = () => request({
	url: '/emoji/list',
	method: 'GET'
})
// 删除表情包
export const reqDelEmoji = (data) => request({
	url: '/emoji/delEmoji',
	method: 'POST',
	data
})
// 置顶表情包
export const reqTopEmoji = (data) => request({
	url: '/emoji/topEmoji',
	method: 'POST',
	data
})