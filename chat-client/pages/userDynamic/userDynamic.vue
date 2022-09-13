<template>
	<view class="pyq">
		<u-navbar :title="remarkName" :bgColor="bgColor" @leftClick="back"></u-navbar>
		<view class="bg-img" @click="previewImage(infoData.background)">
			<image class="image" :src="infoData.background" mode="aspectFill"></image>
		</view>
		<view class="">
			<view class="user-head">
				<view class="username">{{ infoData.username }}</view>
				<u-image @click="previewImage(infoData.avatar)" customStyle="margin-left: 10px;" :src="infoData.avatar" width="80px" height="80px" radius="10"></u-image>
			</view>
			<view class="user-sign">{{ infoData.sign }}</view>
		</view>
		
		<view v-for="item in yearList" :key="item.year">
			<view class="year">{{ item.year }}</view>
			<user-dynamic-item v-for="d_item in item.list" :key="d_item._id" :dynamic-data="d_item" @delSuccess="delSuccess"></user-dynamic-item>
		</view>
		<u-loadmore :status="status" line />
	</view>
</template>

<script>
	import { reqDynamicById } from '@/api/dynamic'
	import { reqInfoById } from '@/api/user'
	export default {
		data() {
			return {
				scrollTop: 0,
				dynamicList: [],
				total: 0,
				page: 1,
				loading: true,
				user_id: '',
				infoData: {}
			}
		},
		computed: {
			bgColor() {
				const opciaty = this.scrollTop / 44
				return `rgba(237, 237, 237, ${opciaty})`
			},
			finished() {
				return this.dynamicList.length >= this.total
			},
			title() {
				return this.infoData.username || '动态'
			},
			remarkName() {
				return this.infoData.remarkName || this.infoData.username
			},
			yearList() {
				const list = this.dynamicList.reduce((pre, cur, index, arr) => {
					const year = new Date(cur.create_time).getFullYear()
					const i = pre.findIndex(item => item.year == year)
					/* 已经存在了这个年份 */
					if (i > -1) {
						pre[i].list.push(cur)
					} else { 
					/* 不存在这个年份 */
						const temp = new Array(cur)
						pre.push({ year: year, list: temp })
					}
					return pre
				}, [])
				return list
			},
			status() {
				if (this.loading) {
					return 'loading'
				} else if(this.finished) {
					return 'nomore'
				} else {
					return 'loading'
				}
			}
		},
		onLoad(options) {
			this.user_id = options.user_id
			this.getInfo()
			this.getList()
		},
		methods: {
			getInfo() {
				reqInfoById({
					id: this.user_id
				})
				.then(res => {
					this.infoData = {
						...res.data
					}
				})
			},
			getList() {
				this.loading = true
				if (this.page == 1) {
					this.dynamicList = []
				}
				reqDynamicById({ user_id: this.user_id, page: this.page, size: 20 })
				.then(res => {
					this.dynamicList = this.dynamicList.concat(res.data.rows).sort((a, b) => b.create_time - a.create_time)
					this.total = res.data.total
					this.loading = false
					uni.stopPullDownRefresh()
				})
				.catch(() => {
					this.loading = false
					uni.stopPullDownRefresh()
				})
			},
			previewImage(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			delSuccess(dynamic_id) {
				this.page = 1
				this.getList()
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		onReachBottom() {
			if (this.loading) return
			if (this.finished) return
			this.page++
			this.getList()
		},
		onPullDownRefresh() {
			if (this.loading) return
			this.page = 1
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
.pyq{
	padding-bottom: 30px;
	.bg-img{
		width: 100%;
		height: 400rpx;
		.image{
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.user-head{
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: -40rpx;
		padding-right: 40rpx;
		.username{
			font-size: 16px;
		}
		.user-head-img{
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
			object-fit: contain;
		}
	}
	.year{
		padding: 15px 15px 0 15px;
		font-size: 30px;
		font-weight: bold;
	}
	.user-sign{
		text-align: right;
		padding: 5px 15px 15px 140px;
		box-sizing: border-box;
		font-size: 12px;
		color: #999;
	}
}
</style>
