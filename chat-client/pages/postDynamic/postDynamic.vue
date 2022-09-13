<template>
	<view>
		<u-navbar title="朋友圈" bgColor="#ededed" @leftClick="back" placeholder>
			<template slot="right">
				<u-button @click="postData" type="success" size="mini">发表</u-button>
			</template>
		</u-navbar>
		<view class="main_content">
			<u-textarea v-model="text" placeholder="说点什么吧..." confirmType="done" maxlength="500" count></u-textarea>
			<upload-image v-if="type == 'image'" :limit="9" v-model="imagesList" />
			<upload-video v-if="type == 'video'" :limit="1" v-model="video" />
		</view>
	</view>
</template>

<script>
	/* 发布动态 */
	import { reqPublishDynamic } from '@/api/dynamic'
	export default {
		data() {
			return {
				text: '',
				imagesList: [],
				type: 'image',
				video: []
			}
		},
		onLoad(options) {
			this.type = options.type || 'image'
		},
		methods: {
			longTap() {
				uni.showToast({
					title: '说点什么吧...'
				})
			},
			postData() {
				if (!this.text.length) {
					uni.showToast({
						title: '说点什么吧...'
					})
					return
				}
				const data = {
					text: this.text,
					type: this.type
				}
				if (this.type == 'image') {
					data.images = this.imagesList
				}
				if (this.type == 'video' && this.video.length) {
					data.video = this.video[0].url
				}
				uni.showLoading({
					title: '发布中...'
				})
				reqPublishDynamic(data)
				.then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '发布成功'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 500)
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.main_content {
		padding: 15px;
		.public{
			margin-top: 30px;
		}
	}
</style>
