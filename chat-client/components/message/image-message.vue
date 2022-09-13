<template>
	<view @click="preViewImage">
		<u-image :src="msgData.content" width="100px" height="100px" bgColor="#fff" lazyLoad></u-image>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import msgType from '@/socket/msgType'
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
			...mapGetters(['curMessageList']),
			imageList() {
				return this.curMessageList.filter(item => item.msgType == msgType.image).map(item => item.content)
			}
		},
		methods: {
			
			preViewImage() {
				const index = this.imageList.findIndex(item => item == this.msgData.content)
				uni.previewImage({
					current: index,
					urls: this.imageList
				})
				
			}
		}
	}
</script>

<style>
</style>