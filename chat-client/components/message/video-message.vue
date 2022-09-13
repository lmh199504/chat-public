<template>
	<view class="video-message" @click="previewVideo">
		<u-image :src="src" width="100px" height="100px" radius="10"></u-image>
		<view class="mask"></view>
		<u-icon class="play-icon" name="play-right-fill" color="#fff"></u-icon>
	</view>
</template>

<script>
	export default{
		props: {
			msgData: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		computed: {
			src() {
				return this.msgData.content + '?x-oss-process=video/snapshot,t_0,f_jpg'
			}
		},
		methods: {
			previewVideo() {
				this.$emit('previewVideo', this.msgData.content)
			}
		}
	}
</script>

<style scoped lang="scss">
	.video-message{
		width: 100px;
		height: 100px;
		position: relative;
		.mask{
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background: rgba(0, 0, 0, 0.3);
		}
		.play-icon{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>