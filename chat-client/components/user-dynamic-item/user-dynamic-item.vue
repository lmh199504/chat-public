<template>
	<view class="pyq-item">
		<view class="left">
			<view class="date">{{ date }}</view>
			<view class="month">{{ month }}月</view>
		</view>
		<view class="right" @longpress="showAction">
			<view class="flex-media">
				<view class="flex-media-img" v-if="imageUrl">
					<view class="images-wrapper" v-if="dynamicData.dynamic_type == 'image'" @click.stop="previewImage">
						<image class="picture" :src="imageUrl" ></image>
					</view>
					<view class="video_wrapper" @click.stop="visible=true" v-if="dynamicData && dynamicData.dynamic_type === 'video' && dynamicData.video">
						<image class="video-image" :src="dynamicData.video + '?x-oss-process=video/snapshot,t_0,f_jpg'"></image>
						<view class="play-icon">
							<u-icon name="play-right-fill" size="30" color="#fff"></u-icon>
						</view>
					</view>
				</view>
				<view class="flex-midia-text" :class="{  'flex-center': !imageUrl }">
					<view class="dynamic-text">{{ dynamicData.text || '' }}</view>
					<view class="total-count" v-if="dynamicData.dynamic_imgs.length">共{{ dynamicData.dynamic_imgs.length }}张照片</view>
				</view>
			</view>
		</view>
		<preview-video :visible.sync="visible" :url="dynamicData.video"></preview-video>
	</view>
</template>

<script>
	import { reqDelDynamic } from '@/api/dynamic'
	import { formatTime } from '@/utils/index.js'
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
				visible: false
			}
		},
		computed: {
			...mapGetters(['userId']),
			imageList() {
				return this.dynamicData.dynamic_imgs || []
			},
			userInfo() {
				return this.dynamicData.user[0] || {}
			},
			time() {
				return formatTime(this.dynamicData.create_time, '{y}-{m}-{d} {h}:{i}')
			},
			month() {
				return new Date(this.dynamicData.create_time).getMonth() + 1
			},
			date() {
				return new Date(this.dynamicData.create_time).getDate()
			},
			imageUrl() {
				if (this.dynamicData.dynamic_type === 'image' && this.dynamicData.dynamic_imgs.length) {
					return this.dynamicData.dynamic_imgs[0].url
				} else if (this.dynamicData.dynamic_type == 'video') {
					return this.dynamicData.video + '?x-oss-process=video/snapshot,t_0,f_jpg'
				} else {
					return ''
				}
			}
		},
		methods: {
			previewImage() {
				uni.previewImage({
					current: 0,
					urls: this.imageList.map(item => item.url)
				})
			},
			showAction() {
				/* 我发的动态可以删除 */
				if (this.dynamicData.user_id == this.userId) {
					uni.showActionSheet({
						itemList: ['删除'],
						success: res => {
							if (res.tapIndex == 0) {
								this.delDynamic()
							}
						}
					})
				}
			},
			delDynamic() {
				uni.showLoading({
					title: '删除中...',
					mask: true
				})
				reqDelDynamic({ dynamic_id: this.dynamicData.dynamic_id })
				.then(res => {
					this.$emit('delSuccess', this.dynamicData.dynamic_id)
					uni.hideLoading()
				})
				.catch(() => {
					
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.pyq-item {
		padding: 30rpx;
		display: flex;
		&:active{
			opacity: 0.8;
		}
		.left {
			margin-right: 10px;
			display: flex;
			align-items: baseline;
			flex-shrink: 0;
			.month{
				font-size: 20px;
			}
			.date{
				font-size: 28px;
				font-weight: bold;
				margin-right: 5px;
			}
			.user-head {
				width: 80rpx;
				height: 80rpx;
				border-radius: 10rpx;
			}
		}
		
		.right {
			flex: 1;
			min-width: 0;
			overflow: hidden;
			.flex-media{
				display: flex;
				
			}
			.flex-media-img{
				width: 100px;
				height: 100px;
				margin-right: 10px;
				flex-shrink: 0;
				.images-wrapper{
					width: 100%;
					height: 100%;
					.picture{
						width: 100%;
						height: 100%;
						border-radius: 5px;
					}
				}
				
				.video_wrapper{
					position: relative;
					width: 100px;
					height: 100px;
					.video-image{
						width: 100%;
						height: 100%;
						border-radius: 5px;
					}
					.play-icon{
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						z-index: 10;
					}
				}
			}

			.flex-midia-text{
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				.dynamic-text{
					color: #333;
					font-weight: 500;
					overflow: hidden;
					/* 将对象作为弹性伸缩盒子模型显示 。 */
					display: -webkit-box;
					/* 限制在一个块元素显示的文本的行数，即行数设置 */
					-webkit-line-clamp: 3;
					/* 规定框从上向下垂直排列子元素 */
					-webkit-box-orient: vertical;
					font-size: 14px;
				}
				.total-count{
					color: #999;
					font-size: 12px;
				}
			}
			.flex-center{
				justify-content: center;
			}
		}
	}
</style>
