<template>
	<view class="content" @click="playRecord">
		<view class="sound">
			{{ duration }}
		</view>
		<view>
			<text class="iconfont icon-saying"></text>
		</view>
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
			duration() {
				const content = JSON.parse(this.msgData.content)
				return parseInt(content.duration / 1000) + '\"' 
			},
			soundUrl() {
				const content = JSON.parse(this.msgData.content)
				return content.url
			}
		},
		methods: {
			playRecord() {
				this.$store.dispatch('message/playRecord', { msg_id: this.msgData.msg_id, url: this.soundUrl })
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		word-break: break-all;
		display: flex;
	}
</style>