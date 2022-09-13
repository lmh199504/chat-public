<template>
	<view class="pyq">
		<u-navbar title="朋友圈" :bgColor="bgColor" @leftClick="back">
			<template slot="right">
				<view @longpress.stop="longPress">
					<u-icon name="camera" size="25" @tap="showAction=true"></u-icon>
				</view>
			</template>
		</u-navbar>
		<view class="bg-img">
			<!-- <image class="image" :src="background" mode="aspectFill"></image> -->
			<yq-avatar 
				ref="yqavatar"
				:selWidth="windowWidth" selHeight="200px" 
				@upload="myUpload" 
				:avatarSrc="background"
				avatarStyle="width: 100vw; height: 200px;border-radius: 0;"
			></yq-avatar>
		</view>
		<view class="">
			<view class="user-head">
				<view class="">{{ nickName }}</view>
				<u--image @click="previewheader" class="user-head-img" :src="avatar" width="60px" height="60px" radius="10px"></u--image>
			</view>
			<view class="user-sign">{{ userInfo.sign }}</view>
		</view>
		
		<view class="">
			<pyq-item v-for="item in dynamicList" :key="item.dynamic_id" :dynamicData="item"></pyq-item>
			<u-loadmore :status="status" line />
		</view>
		
		<u-action-sheet :actions="list" round="10" cancelText="取消" title="发布" :show="showAction"  @select="selectClick" @close="showAction=false"></u-action-sheet>
	</view>
</template>

<script>
	import { reqDynamicList } from '@/api/dynamic.js'
	import { mapGetters } from 'vuex'
	import { upload } from '@/api/common'
	const sysInfo = uni.getSystemInfoSync()
	export default {
		data() {
			return {
				scrollTop: 0,
				list: [
					{
						name:'图片',
						fontSize:'20',
						type: 'image'
					},
					{
						name:'视频',
						fontSize:'20',
						type: 'video'
					},
					{
						name:'文本',
						fontSize:'20',
						type: 'text'
					}
				],
				showAction: false,
				dynamicList: [],
				total: 0,
				page: 1,
				loading: true,
				windowWidth: sysInfo.windowWidth + 'px'
			}
		},
		computed: {
			...mapGetters(['nickName', 'background', 'avatar', 'userInfo']),
			bgColor() {
				const opciaty = this.scrollTop / 44
				return `rgba(237, 237, 237, ${opciaty})`
			},
			finished() {
				return this.dynamicList.length >= this.total
			},
			status() {
				if (this.loading) {
					return 'loading'
				} else if(this.finished) {
					return 'nomore'
				} else {
					return 'loading'
				}
			}
		},
		onShow() {
			this.page = 1
			this.getList()
		},
		methods: {
			longPress() {
				uni.navigateTo({
					url: '/pages/postDynamic/postDynamic?type=text'
				})
			},
			selectClick(val) {
				uni.navigateTo({
					url: '/pages/postDynamic/postDynamic?type=' + val.type
				})
			},
			getList() {
				this.loading = true
				if (this.page == 1) {
					this.dynamicList = []
				}
				reqDynamicList({ page: this.page, size: 5 })
				.then(res => {
					this.dynamicList = this.dynamicList.concat(res.data.rows)
					this.total = res.data.total
					this.loading = false
					uni.stopPullDownRefresh()
				})
				.catch(() => {
					this.loading = false
					uni.stopPullDownRefresh()
				})
			},
			previewheader() {
				uni.previewImage({
					urls: [this.avatar]
				})
			},
			async myUpload(res) {
				const result = await upload(res.path)
				this.$store.dispatch('user/updateBackground', result.url)
			},
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		onReachBottom() {
			if (this.loading) return
			if (this.finished) return
			this.page++
			this.getList()
		},
		onPullDownRefresh() {
			if (this.loading) return
			this.page = 1
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
.pyq{
	padding-bottom: 30px;
	.bg-img{
		width: 100%;
		height: 200px;
		.image{
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.user-head{
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: -40rpx;
		padding-right: 40rpx;
		.user-head-img{
			margin-left: 10px;
		}
	}
	.user-sign{
		text-align: right;
		padding: 5px 15px 15px 140px;
		box-sizing: border-box;
		font-size: 12px;
		color: #999;
	}
}
</style>
