<template>
	<view class="conversation" :style="{ 'padding-bottom': paddingBottom + 'px' }">
		<u-navbar :title="title" placeholder bgColor="#ededed" @leftClick="back"></u-navbar>
		<u-divider text="没有更早的消息~" v-if="finished"></u-divider>
		<MessageItem v-for="item in list" :key="item.msg_id" :msg-data="item" @previewVideo="previewVideo" :friendId="to" />
		<SendBox :to="to" ref="sendBox" @success="scrollBottom" @changeHeight="changeHeight" />
		<view class="page-bottom"></view>
		<preview-video :visible.sync="visible" :url="videoUrl"></preview-video>
	</view>
</template>

<script>
	/* 对话 */
	import SendBox from '@/components/message/send-box.vue'
	import MessageItem from '@/components/message/message-item.vue'
	import { mapGetters } from 'vuex'
	import md5 from 'blueimp-md5'
	import { reqReadMsg } from '@/api/conversation'
	import { connectSocket } from '@/socket'
	import { reqGetMessage } from '@/api/conversation'
	export default {
		components: {
			SendBox,
			MessageItem
		},
		data() {
			return {
				to: '', // 消息接收方
				conversation_id: '',
				paddingBottom: 60,
				videoUrl: '',
				visible: false,
				loading: false,
				finished: false,
				historyList: [],
				page: 0,
				total: 0
			}
		},
		computed: {
			...mapGetters(['userId', 'curMessageList', 'curConversation']),
			/* 会话标题 */
			title() {
				return this.curConversation?.friend_info?.remarkName || this.curConversation?.user_info?.username
			},
			list() {
				return this.curMessageList
					.concat(this.historyList)
					.reduce((pre, cur) => {
						const obj = pre.find(item => item.msg_id === cur.msg_id)
						if (!obj) {
							pre.push(cur)
						}
						return pre
					}, [])
					.sort((a, b) => a.create_time - b.create_time)
			}
		},
		onLoad(options) {
			this.to = options.user_id
			const conversation_id = md5([this.to, this.userId].sort().join(''))
			this.conversation_id = conversation_id
			// 设置当前会话id
			this.$store.commit('message/SET_CUR_CONVERSATION_ID', conversation_id)
			// 标记会话已读
			this.$store.dispatch('message/readMsg', this.conversation_id)
			
		},
		onUnload() {
			// 标记会话已读
			this.$store.dispatch('message/readMsg', this.conversation_id)
		},
		onShow() {
			this.$refs.sendBox?.getSocket()
			this.getSocket()
		},
		mounted() {
			this.$nextTick(() => {
				this.scrollBottom()
			})
		},
		methods: {
			scrollBottom() {
				setTimeout(() => {
					uni.pageScrollTo({
						selector: '.page-bottom',
						duration: 300
					})
				}, 500)
			},
			getSocket() {
				this.socket = connectSocket()
				this.socket.onMessage(() => {
					this.getBottom()
					.then(res => {
						if (res.bottom < 1000) {
							this.scrollBottom()
						}
					})
				})
			},
			// 获取底部 元素的位置
			getBottom() {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.page-bottom').boundingClientRect(data => {
						resolve(data)
					}).exec();
				})
			},
			previewVideo(url) {
				this.visible = true
				this.videoUrl = url
			},
			changeHeight() {
				this.$refs.sendBox?.getHeight()
				.then(data => {
					// 获取高度发送消息框高度
					this.paddingBottom = data.height
					// 滚动到底部
					this.scrollBottom()
				})
			},
			getMessage() {
				if (this.total <= this.historyList.length) {
					this.finished = true
				} else {
					this.finished = false
				}
				if (this.page == 1) {
					this.historyList = []
				}
				reqGetMessage({
					friend_id: this.to,
					page: this.page,
					size: 10
				})	
				.then(res => {
					this.historyList = this.historyList.concat(res.data.rows)
					this.total = res.data.total
					if (this.total <= this.historyList.length) {
						this.finished = true
					} else {
						this.finished = false
					}
					uni.stopPullDownRefresh()
				})
				.catch(() => {
					uni.stopPullDownRefresh()
				})
			}
		},
		onPullDownRefresh() {
			if (this.finished) {
				uni.stopPullDownRefresh()
			} else {
				this.page++
				this.getMessage()
			}
			
		}
	}
</script>

<style scoped lang="scss">
.conversation{
	min-height: 100vh;
	background-color: #f5f5f5;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	transition: all 0.4s ease;
	.page-bottom{
		height: calc(constant(safe-area-inset-bottom));
		height: calc(env(safe-area-inset-bottom));
	}
}
</style>
