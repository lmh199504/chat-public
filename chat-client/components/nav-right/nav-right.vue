<template>
	<view class="nav-right">
		<text class="iconfont icon-sousuo"></text>
		<pop-menu v-model="showMenu" :popData="menuList" @tapPopup="tapPopup" :x="350" :y="35" placement="top-end" >
			<text class="iconfont icon-jiahao" @click="showMenu = !showMenu"></text>
		</pop-menu>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				showMenu: false,
				menuList: [
					{ title: '发起群聊', icon: 'icon-liaotian_jihuo', id: 1 },
					{ title: '添加好友', icon: 'icon-tianjiahaoyou', id: 2 },
					{ title: '扫一扫', icon: 'icon-saoyisao', id: 3 },
					{ title: '收付款', icon: 'icon-shoufukuan', id: 4 }
				]
			}
		},
		methods: {
			tapPopup(val) {
				if (val.id == 2) {
					uni.navigateTo({
						url: '/pages/searchFriend/searchFriend'
					})
				} else if (val.id == 3) {
					// #ifndef H5
					uni.scanCode({
						success(res) {
							console.log(res)
						},
						fail(err) {
							console.log(err)
						}
					})
					// #endif
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	/* #ifdef MP-WEIXIN */
	.nav-right{
		padding-right: 80px;
	}
	/* #endif */
	.iconfont{
		margin-right: 15rpx;
		font-size: 18px;
	}
</style>