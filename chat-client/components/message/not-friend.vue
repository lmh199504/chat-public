<template>
	<view class="not-friend">
		<view>对方还不是你的好友，<text class="request" @click="toSendRequest">发送好友请求</text></view>
	</view>
</template>

<script>
	export default{
		props: {
			msgData: {
				type: Object,
				default: () => {
					return {}
				}
			},
			friendId: {
				type: String
			}
		},
		methods: {
			toSendRequest() {
				uni.navigateTo({
					url: '/pages/sendRequest/sendRequest?user_id=' + this.friendId
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.not-friend{
		padding: 15px;
		text-align: center;
		color: #999;
		font-size: 12px;
		.request{
			color: #309bfb;
		}
	}
</style>