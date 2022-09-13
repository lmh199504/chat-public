<!-- 录音 -->
<template>
	<view class="record">
		<view class="record-border" @touchstart="recordStart" @touchend="recordEnd">
			<view>按住说话...</view>
		</view>
		<view v-if="recording" class="recording">
			<view class="line-wrapper">
				<view class="line line1"></view>
				<view class="line line2"></view>
				<view class="line line3"></view>
				<view class="line line4"></view>
				<view class="line line5"></view>
			</view>
			<view class="text">录音中...</view>
		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager()
	const innerAudioContext = uni.createInnerAudioContext()
	import { upload } from '@/api/common'
	export default{
		props: {
			duration: {
				type: Number,
				default: 60000
			}
		},
		data() {
			return {
				recording: false,
				recordFile: {},
				startTime: 0,
				endTime: 0
			}
		},
		methods: {
			recordStart() {
				console.log('录音开始')
				this.startTime = Date.now()
				recorderManager.start({
					duration: this.duration,
					format: 'mp3'
				})
				this.recording = true
			},
			recordEnd() {
				console.log('结束录音')
				recorderManager.stop()
				this.endTime = Date.now()
				this.recording = false
			},
			// 录音结束回调
			handleEnd() {
				recorderManager.onStop((res) => {
					this.recording = false
					this.recordFile = res
					uni.showModal({
						title: '提示',
						content: '是否发送语音？',
						success: (result) => {
							if (result.confirm) {
								// innerAudioContext.src = res.tempFilePath
								// innerAudioContext.play()
								// this.$store.dispatch('message/playRecord', { msg_id: '', url: res.tempFilePath })
								this.uploadData()
							}
						}
					})
				});
			},
			async uploadData() {
				uni.showLoading({
					title: '发送中...'
				})
				const data = await upload(this.recordFile.tempFilePath)
				uni.hideLoading()
				this.$emit('sendRecord', { duration: this.endTime - this.startTime, url: data.url })
			}
		},
		mounted() {
			this.handleEnd()
		}
		
	}
</script>

<style scoped lang="scss">
	.record{
		.record-border{
			border-radius: 5px;
			border: 1px solid #e3e3e6;
			height: 40px;
			line-height: 40px;
			color: #c0c4cc;
			padding: 0 15px;
			font-size: 14px;
			background-color: #fff;
			box-sizing: border-box;
		}
		.recording{
			position: fixed;
			width: 200px;
			height: 200px;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
			background-color: rgba(0, 0, 0, 0.4);
			border-radius: 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.line-wrapper{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100px;
			}
			.line{
				height: 40px;
				width: 5px;
				border-radius: 5px;
				background-color: #fff;
				margin: 0 10px;
				animation: animateWidth 2s infinite;
			}
			.line1{
				animation-delay: 0.1s;
			}
			.line2{
				
				animation-delay: 0.2s;
			}
			.line3{
	
				animation-delay: 0.4s;
			}
			.line4{

				animation-delay: 0.5s;
			}
			.line5{
				animation-delay: 0.6s;
			}
			.text{
				color: #fff;
			}
		}
	}
	@keyframes animateWidth{
		0% {
			height: 60px;
		}
		50% {
			height: 10px;
		}
		100% {
			height: 60px;
		}
		
	}
</style>