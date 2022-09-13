<template>
	<view class="request-item" @click="toUser">
		<view class="request-item-left">
			<u-image :src="avatarUrl" width="50px" height="50px" radius="5"></u-image>
		</view>
		<view class="request-item-center">
			<view class="user-name">{{ userName }}</view>
			<view class="user-msg">消息：{{ requestData.msg }}</view>
		</view>
		<view class="request-item-right">
			<template v-if="requestData.from === userId">
				<template v-if="requestData.status == requestFriendStatus.undo">
					<text class="text">等待对方通过</text>
				</template>
				<template v-else-if="requestData.status == requestFriendStatus.refuse">
					<text class="text">对方已拒绝</text>
				</template>
				<template v-else>
					<text class="text">对方已同意</text>
				</template>
			</template>
			<template v-else>
				<template v-if="requestData.status == requestFriendStatus.undo">
					<view class="btn-wrapper">
						<view @click.stop="addFriend" class="btn">添加</view>
						<view @click.stop="refuse" class="btn color-danger">拒绝</view>
					</view>
				</template>
				<template v-else-if="requestData.status == requestFriendStatus.refuse">
					<text class="text">已拒绝</text>
				</template>
				<template v-else>
					<text class="text">已同意</text>
				</template>
			</template>
		</view>
	</view>
</template>

<script>
	import { requestFriendStatus } from '@/utils/enum'
	import { dealRequest } from '@/api/friend'
	import { mapGetters } from 'vuex'
	export default{
		props: {
			requestData: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				requestFriendStatus: requestFriendStatus
			}
		},
		computed: {
			...mapGetters(['userId']),
			/* 是否我发出的好友请求 */
			isMine() {
				return this.userId == this.requestData.from
			},
			avatarUrl() {
				if (this.isMine) {
					return this.requestData.to_user.avatar
				} else {
					return this.requestData.form_user.avatar
				}
			},
			userName() {
				if (this.isMine) {
					return this.requestData.to_user.username
				} else {
					return this.requestData.form_user.username
				}
			}
		},
		methods: {
			toUser() {
				uni.navigateTo({
					url: '/pages/userData/userData?id=' + this.isMine ? this.requestData.to : this.requestData.from
				})
			},
			addFriend() {
				uni.showLoading({
					title: '加载中...'
				})
				dealRequest({ request_id: this.requestData.request_id, status: requestFriendStatus.agree })
				.then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '已同意'
					})
					this.$emit('success')
				})
			},
			refuse() {
				dealRequest({ request_id: this.requestData.request_id, status: requestFriendStatus.refuse })
				.then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '已拒绝'
					})
					this.$emit('success')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.request-item{
		display: flex;
		padding: 15px;
		border-bottom: 1px solid #ededee;
		align-items: center;
		&:active{
			background-color: #ededed;
		}
		.request-item-left{
			margin-right: 15px;
		}
		.request-item-center{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			min-width: 0px;
			.user-name{
				font-size: 16px;
				font-weight: bold;
			}
			.user-msg{
				margin-top: 5px;
				color: #999;
				font-size: 14px;
			}
		}
		.request-item-right{
			.btn-wrapper{
				display: flex;
				.btn{
					margin-left: 10px;
					width: 50px;
					background-color: #3c9cff;
					text-align: center;
					color: #fff;
					font-size: 14px;
					border-radius: 5px;
					padding: 4px 0;
					&:active{
						opacity: 0.8;
					}
				}
				.color-danger{
					background-color: #f56c6c;
				}
			}
			.text{
				color: #999;
				font-size: 14px;
			}
		}
	}
</style>