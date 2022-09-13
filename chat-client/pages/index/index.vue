<template>
	<view class="content">
		<u-navbar title="聊天" placeholder bgColor="#ededed">
			<template slot="left">
				<text></text>
			</template>
			<template slot="right">
				<nav-right></nav-right>
			</template>
		</u-navbar>
		</uni-nav-bar>
		<view v-if="conversationList.length">
			<conversation-item v-for="(item, index) in conversationList" :key="item.conversation_id" :conversation-data="item" />
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import { exitApp } from '@/utils'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				backButtonPress: 0
			}
		},
		computed: {
			...mapGetters(['conversationList', 'allUnReadCount', 'isLogin'])
		},
		methods: {
			...mapActions('message', ['getConversationList']),
			runtimeQuit(){
				this.backButtonPress++;
				if (this.backButtonPress > 1) {
					plus.runtime.quit();
				} else {
					plus.nativeUI.toast('再滑一次退出应用');
				}
				setTimeout(function() {
					this.backButtonPress = 0;
				}, 1000);
			}
		},
		onShow() {
			// 设置未读消息数量
			this.$store.commit('message/SET_ALL_UN_READ')
		},
		onLoad() {
			if (!this.isLogin) {
				const timer = setInterval(() => {
					uni.reLaunch({
						url: '/pages/login/login',
						success() {
							clearInterval(timer)
						},
						fail(e) {
							uni.showToast({
								title: '跳转失败',
								icon: 'error'
							})
						}
					})
				}, 100)
			}
		},
		onPullDownRefresh() {
			// 刷新会话列表
			this.getConversationList()
			.finally(() => {
				uni.stopPullDownRefresh()
			})
		}
	}
</script>
