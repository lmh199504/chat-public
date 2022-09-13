<template>
	<view class="conversation-item">
		<view class="conversation-wrapper" @longpress.stop="longPress" @tap="toConversation">
			<view class="left">
				<u-image :src="avatar" width="50px" height="50px" radius="5"></u-image>
				<u-badge max="99" :value="conversationData.unreadCount" :offset="[-5, -10]" :absolute="true" :showZero="false"></u-badge>
			</view>
			<view class="center">
				<view class="nickname">{{ username }}</view>
				<view class="content-text">{{ content }}</view>
			</view>
			<view class="right">
				<view class="time">{{ timestr }}</view>
				<view>&nbsp;</view>
			</view>
		</view>
		<view v-show="showMenu" class="menu box-shadow" :style="styleObj">
			<view class="menu-item">标记为已读</view>
			<view class="menu-item">标记为置顶</view>
			<view class="menu-item">删除聊天</view>
		</view>
		<view v-if="showMenu" class="mask" @tap="showMenu=false"></view>
	</view>
</template>

<script>
	import msgType from '@/socket/msgType'
	import { formatTime } from '@/utils'
	export default {
		name: 'ConversationItem',
		props: {
			offset: { // 距离边框位置
				type: Number,
				default: 100
			},
			conversationData: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				styleObj: {
					left: 0 + 'px',
					top: 0 + 'px'
				},
				showMenu: false
			};
		},
		computed: {
			content() {
				if (!this.conversationData.message) return ''
				if (this.conversationData.message.msgType == msgType.text) {
					return this.conversationData.message.content
				}
				if (this.conversationData.message.msgType == msgType.image) {
					return '[图片消息]'
				}
				if (this.conversationData.message.msgType == msgType.video) {
					return '[视频消息]'
				}
				if (this.conversationData.message.msgType == msgType.file) {
					return '[文件消息]'
				}
				if (this.conversationData.message.msgType == msgType.sound) {
					return '[语音消息]'
				}
				if (this.conversationData.message.msgType == msgType.notFriend) {
					return '[对方还不是你的好友]'
				}
			},
			username() {
				if (this.conversationData.friend_info.remarkName) {
					return this.conversationData.friend_info.remarkName
				} else {
					return this.conversationData.user_info.username
				}
			},
			avatar() {
				return this.conversationData.user_info.avatar
			},
			timestr() {
				return formatTime(this.conversationData.update_time)
			}
		},
		methods: {
			getPopData() {
				return new Promise((resolve, reject) => {
					this.$nextTick(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('.menu').boundingClientRect(data => {
							resolve(data)
						}).exec();
					})
				})
			},
			async longPress(e) {
				const data = uni.getSystemInfoSync()
				// console.log(data)
				const x = e.touches[0].clientX < (data.screenWidth - this.offset) ? e.touches[0].clientX : (e.touches[0].clientX - this.offset)
				const y = e.touches[0].clientY < (data.screenHeight - this.offset) ? e.touches[0].clientY : (e.touches[0].clientY - this.offset)
				// const x = e.touches[0].clientX
				// const y = e.touches[0].clientY
				this.styleObj = {
					left: x + 'px',
					top: y + 'px'
				}
				this.showMenu = true
			},
			toConversation() {
				uni.navigateTo({
					url: '/pages/conversation/conversation?user_id=' + this.conversationData.user_info.id
				})
				this.$store.commit('message/SET_CUR_CONVERSATION_ID', this.conversationData.conversation_id)
			}
		},
		
	}
</script>

<style scoped lang="scss">
	.conversation-item {
		.conversation-wrapper {
			display: flex;
			padding: 20rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			&:active{
				background: #F8F8Ff;
			}
			.left {
				margin-right: 30rpx;
				position: relative;
			}

			.center {
				flex: 1;
				overflow: hidden;
				min-width: 0;
				padding-right: 30rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.nickname {
					font-size: 28rpx;
				}

				.content-text {
					margin-top: 10rpx;
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #999;
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.time{
					font-size: 22rpx;
					color: #999;
				}
				.badge{
					margin-top: 10rpx;
					width: 40rpx;
				}
			}
		}
		.menu{
			position: absolute;
			z-index: 10;
			left: 50px;
			top: 60px;
			background: #fff;
			padding: 20rpx;
			border-radius: 5px;
			.menu-item{
				margin-bottom: 10px;
				font-size: 14px;
				&:last-child{
					margin-bottom: 0;
				}
			}
		}
		.mask{
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9;
			
		}
	}
</style>
