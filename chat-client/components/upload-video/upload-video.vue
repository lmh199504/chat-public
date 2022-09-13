<template>
	<view class="upload-file">
		<u-row class="flex-wrap" :gutter="10">
			<u-col span="4" v-show="fileList.length < limit">
				<view class="up-item">
					<view class="up-item-inner" @click="chooseFile">
						<u-icon name="plus" size="40" color="#dbdcdf"></u-icon>
					</view>
				</view>
			</u-col>
			<u-col span="4" v-for="(item, index) in fileList" :key="index">
				<view class="up-item">
					<view class="up-item-inner" @click.stop="previewVideo(item)">
						<view class="play-icon">
							<u-icon name="play-right-fill" size="30" color="#fff"></u-icon>
						</view>
						<image class="images" :src="item.post" mode=""></image>
					</view>
				</view>
			</u-col>
		</u-row>
		<preview-video :visible.sync="visible" :url="videoUrl"></preview-video>
	</view>
</template>

<script>
	import { upload } from '@/api/common.js'
	export default {
		model: {
			value: 'fileList',
			event: 'input'
		},
		props: {
			limit: {
				type: Number,
				default: 1
			},
			fileList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				visible: false,
				videoUrl: ''
			}
		},
		methods: {
			chooseFile() {
				uni.chooseVideo({
					count: 1,
					extension: ['mp4'],
					compressed: false,
					success: async (res) => {
						try{
							uni.showLoading({
								title: '上传中...',
								mask: true
							})
							const fileList = this.fileList
							const item = res.tempFile
							const result = await upload(res.tempFilePath)
							fileList.push({
								url: result.url,
								post: result.url + '?x-oss-process=video/snapshot,t_0,f_jpg'
							})
							this.$emit('input', fileList)
							uni.hideLoading()
						}catch(e){
							//TODO handle the exception
							uni.hideLoading()
						}
					}
				})
			},
			previewVideo(item) {
				this.videoUrl = item.url
				this.visible = true
			}
		}
	}
</script>

<style scoped lang="scss">
.upload-file{
	margin-top: 15px;
	.flex-wrap{
		flex-wrap: wrap;
	}
	.up-item{
		position: relative;
		border: 1px solid #dbdcdf;
		padding-bottom: 100%;
		border-radius: 5px;
		margin-bottom: 10px;
		.up-item-inner{
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.images{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
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
</style>
