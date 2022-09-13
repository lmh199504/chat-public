import request from '@/utils/request'

/* 发布动态 */
export const reqPublishDynamic = (data) => request({
	url: '/user/dynamic',
	method: 'POST',
	data
})
/* 获取动态 */
export const reqDynamicList = (data) => request({
	url: '/dynamic/list',
	method: 'GET',
	data
})
/* 根据id获取用户的动态 */
export const reqDynamicById = (data) => request({
	url: '/dynamic/dynamicById',
	method: 'POST',
	data
})
/* 删除动态 */
export const reqDelDynamic = (data) => request({
	url: '/dynamic/delDynamic',
	method: 'POST',
	data
})

