<template>
	<view>
		<u-popup :show="show" @close="close" @open="open" mode="center">
			<video style="width: 100vw;" id="myVideo" :src="url"></video>
		</u-popup>
	</view>
</template>

<script>
	export default{
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			url: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				videoContext: null
			}
		},
		computed: {
			show: {
				get() {
					return this.visible
				},
				set(val) {
					this.$emit('update:visible', val)
				}
			}
		},
		mounted() {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			close() {
				this.$emit('update:visible', false)
				this.videoContext.stop()
			},
			open() {
				this.videoContext.play()
			}
		}
	}
</script>

<style>
</style>
