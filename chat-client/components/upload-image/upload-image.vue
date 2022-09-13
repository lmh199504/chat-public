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
					<view class="up-item-inner">
						<image @click.stop="previewImg(index)" class="images" :src="item.url" mode=""></image>
						<view class="icon-remove" @click="removeImg(index)">
							<u-icon name="close-circle-fill" color="red" size="20"></u-icon>
						</view>
					</view>
				</view>
			</u-col>
		</u-row>
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
				default: 9
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
				
			}
		},
		methods: {
			chooseFile() {
				uni.chooseImage({
					count: this.limit - this.fileList.length,
					extension: ['jpg', 'png'],
					success: async (res) => {
						try{
							uni.showLoading({
								title: '上传中...',
								mask: true
							})
							const fileList = this.fileList
							for(let i = 0; i < res.tempFiles.length;i++) {
								const item = res.tempFiles[i]
								const result = await upload(item.path)
								fileList.push({
									url: result.url
								})
							}
							this.$emit('input', fileList)
							uni.hideLoading()
						}catch(e){
							//TODO handle the exception
							uni.hideLoading()
						}
					}
				})
			},
			previewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.fileList.map(item => item.url)
				})
			},
			removeImg(index) {
				const fileList = this.fileList
				fileList.splice(index, 1)
				this.$emit('input', fileList)
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
			.icon-remove{
				position: absolute;
				top: 0;
				right: 0;
				background-color: #ededed;
				border-radius: 0 0 0 50% ;
			}
		}
	}
}
</style>
