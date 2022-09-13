<template>
	<view class="page">
		<u-navbar :title="title" placeholder bgColor="#ededed" @leftClick="back"></u-navbar>
		<view>
			<view class="user-info">
				<view class="left">
					<u--image :src="infoData.avatar" width="100px" height="100px" radius="10px"></u--image>
				</view>
				<view class="right">
					<view class="remark-name">{{ remarkName }}</view>
					<view class="nickname">昵称：{{ infoData.username }}</view>
					<view class="account">账号：{{ infoData.account }}</view>
				</view>
			</view>
		</view>
		
		<view class="flex-arrow friend" @click="tapFriend">
			<view class="flex-lable">朋友圈</view>
			<view class="flex-content">
				<view class="images-wrapper">
					<u-image customStyle="margin-right: 10px;" radius="5" width="30px" height="30px" v-for="(item, index) in images" :src="item" :key="index"></u-image>
				</view>
			</view>
			<view class="flex-icon"><u-icon name="arrow-right"></u-icon></view>
		</view>
		<template v-if="userId != id">
			<view v-if="!infoData.isFriend" class="chat-item" @click="sendRequest">
				<u-icon name="man-add" size="25" color="#5a6e8c"></u-icon>
				<text>添加好友</text>
			</view>
			<view v-else class="chat-item" @click="toChat">
				<u-icon name="chat" size="25" color="#5a6e8c"></u-icon>
				<text>发送消息</text>
			</view>
			<view v-if="infoData.isFriend" class="chat-item del-friend">
				<u-icon name="trash" size="25" color="red"></u-icon>
				<text>删除好友</text>
			</view>
		</template>
	</view>
</template>

<script>
	import { reqInfoById } from '@/api/user'
	import { reqDynamicById } from '@/api/dynamic'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				id: '',
				infoData: {},
				images: []
			}
		},
		computed: {
			...mapGetters(['userId']),
			title() {
				return this.infoData.username || '用户信息'
			},
			remarkName() {
				return this.infoData.remarkName || this.infoData.username
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getInfo()
			this.getDynamic()
		},
		methods: {
			getInfo() {
				reqInfoById({
					id: this.id
				})
				.then(res => {
					this.infoData = {
						...res.data
					}
				})
			},
			getDynamic() {
				reqDynamicById({
					user_id: this.id,
					page: 1,
					size: 10,
				})
				.then(res => {
					const list = []
					res.data.rows.forEach((item, index) => {
						if (item.dynamic_type == 'image') {
							item.dynamic_imgs.forEach(imgs => {
								if (list.length < 4) {
									list.push(imgs.url)
								}
							})
						}
					})
					this.images = list
				})
			},
			/* 点击用户动态 */
			tapFriend() {
				uni.navigateTo({
					url: '/pages/userDynamic/userDynamic?user_id=' + this.id
				})
			},
			sendRequest() {
				uni.navigateTo({
					url: '/pages/sendRequest/sendRequest?user_id=' + this.id
				})
			},
			toChat() {
				uni.navigateTo({
					url: '/pages/conversation/conversation?user_id=' + this.id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.page{
	background: #ededed;
	min-height: 100vh;
}
.user-info{
	padding: 15px;
	display: flex;
	align-items: center;
	background: #fff;
	.left{
		margin-right: 30px;
	}
	.right{
		.remark-name{
			font-size: 20px;
			font-weight: bold;
		}
		.account{
			margin-top: 5px;
		}
		.nickname{
			margin-top: 5px;
		}
	}
}

.flex-arrow{
	display: flex;
	align-items: center;
	background-color: #fff;
	margin-top: 2px;
	padding: 15px;
	&:active{
		opacity: 0.8;
	}
	.flex-lable{
		margin-right: 15px;
	}
	.flex-content{
		flex: 1;
		min-width: 0;
		overflow: hidden;
		.images-wrapper{
			display: flex;
		}
	}
}
.friend{
	margin-top: 10px;
	margin-bottom: 10px;
}
.chat-item{
	background-color: #fff;
	margin-top: 2px;
	display: flex;
	padding: 15px 0;
	justify-content: center;
	color: #5a6e8c;
	&:active{
		opacity: 0.8;
	}
}
.del-friend{
	color: red;
}
</style>
