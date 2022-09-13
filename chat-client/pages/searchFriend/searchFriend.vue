<template>
	<view>
		<u-navbar title="添加好友" placeholder bgColor="#ededed" @leftClick="back"></u-navbar>
		<view class="main_content">
			<u-search placeholder="搜索ID/账号" v-model="keyword" @search="search" @custom="search"></u-search>
		</view>
	</view>
</template>

<script>
	import { reqSearchFriend } from '@/api/friend'
	export default {
		data() {
			return {
				keyword: ''
			}
		},
		methods: {
			search() {
				if (!this.keyword) return
				reqSearchFriend({
					keyword: this.keyword
				})
				.then(res => {
					if (res.data == null) {
						uni.showToast({
							title: '用户不存在',
							icon: 'none'
						})
					} else {
						uni.navigateTo({
							url: '/pages/userData/userData?id=' + res.data.id
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.main_content{
	padding: 15px;
}
</style>
