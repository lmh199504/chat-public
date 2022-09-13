<template>
	<view class="mine">
		<u-navbar title="我的" placeholder bgColor="#ededed">
			<template slot="left">
				<text></text>
			</template>
		</u-navbar>
		<view class="user-info">
			<view class="user-avatar">
				<yq-avatar 
					:noTab="noTab"
					ref="yqavatar"
					selWidth="200px" selHeight="200px" @upload="myUpload" 
					:avatarSrc="userInfo.avatar"
					avatarStyle="width: 100px; height: 100px; border-radius: 10px;"
				/>
			</view>
			<view class="user-data">
				<view class="username">
					{{ userInfo.username }}
				</view>
				<view class="user-account" @click.stop="copyAccount">
					账号：{{ userInfo.account }}
				</view>
				<view v-if="userInfo.sign" class="user-sign">
					个性签名：{{ userInfo.sign }}
				</view>
			</view>
			<view class="arrow" @click.stop="editUser">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<u-button @click="out">
			退出
		</u-button>
		<u-button v-if="!isLogin" @click="toLogin">
			登录
		</u-button>
	</view>
</template>

<script>
	import { exitApp } from '@/utils'
	import { mapGetters } from 'vuex'
	import { upload } from '@/api/common'
	export default {
		data() {
			return {
				noTab: false,
				backButtonPress: 0
			}
		},
		computed: {
			...mapGetters(['userInfo', 'isLogin'])
		},
		methods: {
			 async out() {
				// 重置用户信息
				await this.$store.dispatch('user/resetUserInfo')
				// 会话列表
				this.$store.commit('message/SET_CONVERSATION_LIST', [])
				// 表情
				this.$store.commit('emoji/SET_EMOJI_LIST', [])
				this.$store.commit('emoji/SET_IS_GET', false)
				// 好友请求
				this.$store.commit('friend/SET_REQUEST_LIST', [])
				// 好友列表
				this.$store.commit('friend/SET_FRIEND_LIST', [])
				// 关闭socket
				uni.closeSocket()
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},
			copyAccount() {
				uni.setClipboardData({
					data: this.userInfo.account,
					success() {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						})
					}
				})
			},
			async myUpload(res) {
				const result = await upload(res.path)
				this.$store.dispatch('user/updateAvatar', result.url)
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
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
			},
			editUser() {
				uni.navigateTo({
					url: '/pages/editUser/editUser'
				})
			}
		},
		onLoad() {
			uni.showTabBar()
		},
		onHide() {
			this.$refs.yqavatar.fClose()
		},
		onBackPress() {
			console.log('撒旦发射点发射点')
			exitApp()
		}
	}
</script>

<style scoped lang="scss">
.mine{
	min-height: calc(100vh);
	/* #ifdef H5 */
	min-height: calc(100vh - 50px);
	/* #endif */
	background: #ededed;
	box-sizing: border-box;
	.user-info{
		display: flex;
		background-color: #fff;
		padding: 30px;
		box-sizing: border-box;
		margin-bottom: 15px;
		.user-avatar{
			margin-right: 15px;
		}
		.username{
			font-size: 20px;
			font-weight: bold;
			margin-bottom: 15px;
		}
		.user-account{
			color: #999;
		}
		.user-data{
			flex: 1;
			min-width: 0px;
		}
		.user-sign{
			margin-top: 15px;
			font-size: 14px;
			color: #999;
		}
	}
	.arrow{
		padding-left: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}
</style>
