<template>
	<view class="">
		<u-navbar title="发现" placeholder bgColor="#ededed">
			<template slot="left">
				<text></text>
			</template>
			<template slot="right">
				<nav-right></nav-right>
			</template>
		</u-navbar>
		<u-index-list :indexList="indexList" :customNavHeight="customNavHeight">
			<view slot="header" class="list">
				<view class="list__item flex-between" @click="toList">
					<view class="list__item-left">
						<u-avatar shape="square" size="35" icon="man-add-fill" fontSize="26" randomBgColor></u-avatar>
						<text class="list__item__user-name">新的朋友</text>
					</view>
					<view class="list__item-right">
						<u-badge :value="unreadCountRequest" :showZero="false"></u-badge>
					</view>
				</view>
				<u-line></u-line>
				<view class="list__item">
					<u-avatar shape="square" size="35" icon="tags-fill" fontSize="26" randomBgColor></u-avatar>
					<text class="list__item__user-name">标签</text>
				</view>
				<u-line></u-line>
				<view class="list__item" @click="toPyq">
					<u-avatar shape="square" size="35" icon="chrome-circle-fill" fontSize="26" randomBgColor></u-avatar>
					<text class="list__item__user-name">朋友圈</text>
				</view>
				<u-line></u-line>
				<view class="list__item">
					<u-avatar shape="square" size="35" icon="qq-fill" fontSize="26" randomBgColor></u-avatar>
					<text class="list__item__user-name">QQ</text>
				</view>
				<u-line></u-line>
			</view>
			<template v-for="(item, index) in itemArr">
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor :text="indexList[index]" :key="index"></u-index-anchor>
				<!-- #endif -->
				<u-index-item :key="index">
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="indexList[index]"></u-index-anchor>
					<!-- #endif -->
					<view class="list" v-for="(item1, index1) in item" :key="index1">
						<view class="list__item" @click="toUserData(item1)">
							<image class="list__item__avatar" :src="item1.avatar"></image>
							<text class="list__item__user-name">{{item1.username}}</text>
						</view>
						<u-line></u-line>
					</view>
				</u-index-item>
			</template>
			<view slot="footer" class="u-safe-area-inset--bottom">
				<text class="list__footer">共{{ friendNum }}位好友</text>
			</view>
		</u-index-list>
	</view>

</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				backButtonPress: 0
			}
		},
		computed: {
			...mapGetters(['unreadCountRequest', 'friendList', 'friendNum']),
			itemArr() {
				return this.friendList.map(item => item.list)
			},
			customNavHeight() {
				const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
				return statusBarHeight + 44
			},
			indexList() {
				return this.friendList.map(item => item.letter)
			}
		},
		methods: {
			toList() {
				uni.navigateTo({
					url: '/pages/requestList/requestList'
				})
			},
			toPyq() {
				uni.navigateTo({
					url: '/pages/pyq/pyq'
				})
			},
			toUserData(item) {
				uni.navigateTo({
					url: '/pages/userData/userData?id=' + item.friend_id
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
			}
		},
		onShow() {
			this.$store.commit('friend/SET_UNREAD')
		}
	}
</script>

<style lang="scss">
	.list {
		&__item {
			@include flex;
			padding: 6px 12px;
			align-items: center;
			&__avatar {
				height: 35px;
				width: 35px;
				border-radius: 3px;
			}

			&__user-name {
				font-size: 16px;
				margin-left: 10px;
				color: $u-main-color;
			}
			&:active{
				background-color: #ededed;
			}
		}
		.list__item-left{
			display: flex;
			align-items: center;
		}
		.flex-between{
			justify-content: space-between;
		}
		&__footer {
			color: $u-tips-color;
			font-size: 14px;
			text-align: center;
			margin: 15px 0;
			display: block;
		}
	}
</style>
