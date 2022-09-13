<template>
	<view class="pyq-item">
		<view class="left" @click="toUserData">
			<u--image :src="userInfo.avatar" width="40px" height="40px" radius="5"></u--image>
		</view>
		<view class="right">
			<view class="user-name">{{ userInfo.username }}</view>
			<view class="text">{{ dynamicData.text || '' }}</view>
			<!-- 图片区域 -->
			<view v-if="dynamicData && dynamicData.dynamic_type === 'image'">
				<u-row class="flex-wrap" gutter="10">
					<u-col :span="4" v-for="(item, index) in imageList" :key="index">
						<view class="picture" @click="previewImage(index)">
							<image class="image" :src="item.url"></image>
						</view>
					</u-col>
				</u-row>
			</view>
			<!-- 视频 -->
			<view class="video_wrapper" @click="visible=true" v-if="dynamicData && dynamicData.dynamic_type === 'video' && dynamicData.video">
				<image class="video-image" :src="dynamicData.video + '?x-oss-process=video/snapshot,t_0,f_jpg'" mode="widthFix"></image>
				<view class="play-icon">
					<u-icon name="play-right-fill" size="30" color="#fff"></u-icon>
				</view>
			</view>
			<view class="footer">
				<view class="time">{{ time }}</view>
				<view class="menu">
					<pop-menu v-model="showMenu" placement="left">
						<template slot="content">
							<view class="menu-tool">
								<view class="too-item" @click="tapLike">
									<u-icon name="thumb-up" color="#fff" size="20"></u-icon>
									<view v-if="!isLike">点赞</view>
									<view v-else>取消</view>
								</view>
								<view class="too-item" @click="toComment">
									<u-icon name="chat" color="#fff" size="20"></u-icon>
									<view>评论</view>
								</view>
							</view>
						</template>
						<view class="" @tap="tapMenu" >
							<u-icon name="more-dot-fill" color="#1a73e8"></u-icon>
						</view>
					</pop-menu>
				</view>
			</view>
			<like-list v-if="likeList.length" :list="likeList"></like-list>
			<comment-list v-if="commentList.length" :list="commentList" @commetToUser="commetToUser"></comment-list>
		</view>
		<preview-video :visible.sync="visible" :url="dynamicData.video"></preview-video>
		<comment-input v-if="showCommentInput" @confirm="confirm" @hide="showCommentInput=false"></comment-input>
	</view>
</template>

<script>
	import { formatTime } from '@/utils/index.js'
	import { reqSendComment, reqComment, reqLikeDynamic } from '@/api/comment'
	import { mapGetters } from 'vuex'
	export default{
		props: {
			dynamicData: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				showMenu: false,
				visible: false,
				showCommentInput: false,
				to: '',
				commentList: [],
				likeList: [],
				isLike: false
			}
		},
		computed: {
			...mapGetters({
				userId: 'userId',
				myInfo: 'userInfo'
			}),
			imageList() {
				return this.dynamicData.dynamic_imgs || []
			},
			userInfo() {
				return this.dynamicData.user[0] || {}
			},
			time() {
				return formatTime(this.dynamicData.create_time, '{y}-{m}-{d} {h}:{i}')
			}
		},
		created() {
			this.commentList = this.dynamicData.comment || []
			this.likeList = this.dynamicData.likeList || []
			this.isLike = this.likeList.findIndex(item => item.id == this.userId) > -1 ? true : false
		},
		methods: {
			previewImage(index) {
				uni.previewImage({
					current: index,
					urls: this.imageList.map(item => item.url)
				})
			},
			tapMenu(e) {
				this.showMenu = true
			},
			toUserData() {
				uni.navigateTo({
					url: '/pages/userData/userData?id=' + this.userInfo.id
				})
			},
			toComment() {
				this.to = this.userInfo.id
				this.showCommentInput = true
			},
			confirm(text) {
				uni.showLoading({
					title: '发送中...'
				})
				reqSendComment({
					from: this.userId,
					to: this.to,
					dynamic_id: this.dynamicData.dynamic_id,
					content: text
				})
				.then(res => {
					uni.hideLoading()
					this.showCommentInput = false
					this.getComment()
					uni.showToast({
						title: '发送成功',
						icon: 'none'
					})
				})
			},
			// 回复用户
			commetToUser(item) {
				// console.log(item)
				this.to = item.from_info.id
				this.showCommentInput = true
			},
			getComment() {
				reqComment({ dynamic_id: this.dynamicData.dynamic_id })
				.then(res => {
					this.commentList = res.data
				})
			},
			// 点赞
			tapLike() {
				const data = { dynamic_id: this.dynamicData.dynamic_id }
				reqLikeDynamic(data)
				.then(() => {
					if (this.isLike) {
						const index = this.likeList.findIndex(item => item.id == this.userId)
						this.likeList.splice(index, 1)
					} else {
						this.likeList.push({
							id: this.userId,
							username: this.myInfo.username
						})
					}
					
					this.isLike = !this.isLike
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.pyq-item {
		padding: 30rpx;
		display: flex;
		
		&:not(:last-child) {
			border-bottom: 1px solid #eaebec;
		}
		.left {
			margin-right: 10rpx;

			.user-head {
				width: 80rpx;
				height: 80rpx;
				border-radius: 10rpx;
			}
		}
		
		.right {
			flex: 1;
		
			.user-name {
				font-size: 28rpx;
				color: #566693;
			}
			.text {
				margin-top: 10rpx;
				font-size: 28rpx;
				// width: 500rpx;
				line-height: 45rpx;
				margin-bottom: 10px;
			}
			.flex-wrap{
				flex-wrap: wrap;
			}
			.picture{
				width: 100%;
				position: relative;
				padding-bottom: 100%;
				margin-bottom: 20rpx;
				.image{
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					position: absolute;
					border-radius: 10rpx;
				}
			}
			.video_wrapper{
				position: relative;
				// width: 250px;
				.video-image{
					width: 250px;
				}
				.play-icon{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 10;
				}
			}
			.footer{
				font-size: 12px;
				display: flex;
				justify-content: space-between;
				.time{
					color: #999;
				}
				.menu-tool{
					display: flex;
					.too-item{
						display: flex;
						margin: 0 5px;
						align-items: center;
					}
				}
			}
		}
	}
</style>
