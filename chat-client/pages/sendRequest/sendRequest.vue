<template>
	<view class="send-request">
		<u-navbar title="发送请求" placeholder bgColor="#ededed" @leftClick="back"></u-navbar>
		<view class="main_content">
			<u--textarea v-model="text" confirmType="done" placeholder="跟好友说点什么..." maxlength="500" count></u--textarea>
			
			<view class="btn">
				<u-button :loading="loading" color="#07c160" @click="send">发送请求</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { reqSendFriendRequest } from '@/api/friend'
	export default {
		data() {
			return {
				text: '',
				loading: false,
				user_id: ''
			}
		},
		onLoad(options) {
			this.user_id = options.user_id
		},
		methods: {
			send() {
				uni.showLoading({
					title: '发送中...',
					mask: true
				})
				this.loading = true
				reqSendFriendRequest({
					user_id: this.user_id,
					msg: this.text
				})
				.then(res => {
					uni.hideLoading()
					this.loading = false
					uni.showToast({
						title: '发送成功',
						icon:'success'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/friend/friend'
						})
					}, 1000)
				})
				.catch(() => {
					this.loading = false
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.main_content{
	padding: 15px;
	.btn{
		margin: auto;
		margin-top: 15px;
	}
}
</style>
