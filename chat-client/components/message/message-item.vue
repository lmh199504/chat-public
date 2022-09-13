<template>
	<view>
		<view v-if="msgData.msgType == msgType.notFriend">
			<NotFriend :msg-data="msgData" :friendId="friendId"></NotFriend>
		</view>
		<view v-else class="message-item" :class="{ 'message-item-reverse': isMine }">
			<view class="user-head" @click="toUserData">
				<MessageAvatar :src="isMine ? avatar : toAvatar"/>
			</view>
			<view class="message-content">
				<MessageBubble :position="position " :color="color">
					<TextMessage v-if="msgData.msgType === msgType.text" :msg-data="msgData" />
					<ImageMessage v-else-if="msgData.msgType === msgType.image" :msg-data="msgData" />
					<VideoMessage v-else-if="msgData.msgType === msgType.video" :msg-data="msgData" @previewVideo="previewVideo" />
					<SoundMessage v-else-if="msgData.msgType === msgType.sound" :msg-data="msgData" />
				</MessageBubble>
			</view>
			<view v-if="msgData.is_fail" class="fail">
				<u-icon name="error-circle-fill" color="red"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import MessageBubble from './message-bubble.vue'
	import MessageAvatar from './message-avatar.vue'
	import TextMessage from './text-message.vue'
	import ImageMessage from './image-message.vue'
	import VideoMessage from './video-message.vue'
	import SoundMessage from './sound-message.vue'
	import { mapGetters } from 'vuex'
	import msgType from '@/socket/msgType'
	import NotFriend from './not-friend.vue'
	export default{
		components: {
			MessageBubble,
			MessageAvatar,
			TextMessage,
			ImageMessage,
			VideoMessage,
			SoundMessage,
			NotFriend
		},
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
		data() {
			return {
				msgType: msgType
			}
		},
		computed: {
			...mapGetters(['userId', 'curConversation', 'userInfo', 'avatar']),
			// 是否我发出的消息
			isMine() {
				return this.userId === this.msgData.from
			},
			position() {
				return this.isMine ? 'right' : 'left'
			},
			color() {
				return this.isMine ? 'green' : 'white'
			},
			toAvatar() {
				return this.curConversation?.user_info?.avatar
			}
		},
		methods: {
			toUserData() {
				const id = this.isMine ? this.userId : this.curConversation.friend_id
				uni.navigateTo({
					url: '/pages/userData/userData?id=' + id
				})
			},
			previewVideo(url) {
				this.$emit('previewVideo', url)
			}
		}
	}
</script>

<style scoped lang="scss">
	.message-item{
		padding: 15px;
		display: flex;
		align-items: center;
		.user-head{
			flex-shrink: 0;
		}
		.message-content{
			width: fit-content;
			overflow: hidden;
			min-width: 0px;
		}
		.fail{
			margin: 5px;
		}
	}
	.message-item-reverse{
		flex-direction: row-reverse;
	}
</style>