<template>
	<view class="page">
		<u-navbar title="好友请求" placeholder bgColor="#ededed" @leftClick="back"></u-navbar>
		<view class="main_content">
			<request-item v-for="item in list" :key="item.request_id" :requestData="item" @success="refresh"></request-item>
			<u-empty v-if="!loading && list.length == 0"></u-empty>
		</view>
	</view>
</template>

<script>
	import { reqRequestList, reqReadRequest } from '@/api/friend'
	export default {
		data() {
			return {
				page: 1,
				loading: true,
				list: [],
				total: 0
			}
		},
		computed: {
			finished() {
				return this.list.length >= this.total
			}
		},
		methods: {
			getList() {
				this.loading = true
				if (this.page == 1) {
					this.list = []
				}
				reqRequestList({
					page: this.page,
					size: 20
				})
				.then(res => {
					this.loading = false
					this.list = this.list.concat(res.data.rows)
					this.total = res.data.total
				})
				.catch(() => {
					this.loading = false
				})
			},
			refresh() {
				this.page = 1
				this.getList()
			}
		},
		onShow() {
			this.getList()
			/* 更新状态 */
			reqReadRequest()
			.then(() => {
				this.$store.dispatch('friend/getList')
			})
		},
		onUnload() {
			/* 更新状态 */
			reqReadRequest()
			.then(() => {
				this.$store.dispatch('friend/getList')
			})
		},
		onReachBottom() {
			if (this.loading) return
			if (this.finished) return
			this.page ++ 
			this.getList()
		}
	}
</script>

<style>

</style>
