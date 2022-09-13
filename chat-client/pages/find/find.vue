<template>
	<view class="find">
		<u-navbar title="聊天" placeholder bgColor="#ededed">
			<template slot="left">
				<text></text>
			</template>
			<template slot="right">
				<nav-right></nav-right>
			</template>
		</u-navbar>
		<u-cell-group>
			<u-cell title="朋友圈" isLink rightIconStyle="color:#aeaeae;" name="pyq" @click="tabCell">
				<template slot="icon">
					<image class="left-icon" src="../../static/icon/pyq.png"></image>
					<!-- <text class="iconfont icon-pengyouquan"></text> -->
				</template>
			</u-cell>
			<view class="line"></view>
			<u-cell title="扫一扫" isLink rightIconStyle="color:#aeaeae;">
				<template slot="icon">
					<image class="left-icon" src="../../static/icon/saoyisao.png" mode=""></image>
				</template>
			</u-cell>
			<view class="line"></view>
			<u-cell title="小程序" isLink rightIconStyle="color:#aeaeae;">
				<template slot="icon">
					<image class="left-icon" src="../../static/icon/miniprogram.png" mode=""></image>
				</template>
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backButtonPress: 0
			}
		},
		methods: {
			tabCell({ name }) {
				if (name == 'pyq') {
					uni.navigateTo({
						url: '/pages/pyq/pyq'
					})
				}
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
			}
		},
		onLoad() {
			uni.showTabBar()
		},
		onShow() {
			this.$store.commit('friend/SET_UNREAD')
		}
	}
</script>

<style scoped lang="scss">
.left-icon{
	width: 40rpx;
	height: 40rpx;
}

.find{
	/deep/ .u-cell__body + .u-line {
		border-bottom: 10px solid #ededed !important;
	} 
}
</style>
