<template>
	<view class="content">
		<!-- {{ msgData.content }} -->
		<view class="msg-wrapper" v-for="(item, index) in msgList" :key="index">
		    <text v-if="item.name === 'text'">{{ item.text }}</text>
			<image class="img" v-else-if="item.name === 'img'" :src="item.src" />
		</view>
	</view>
</template>

<script>
	import { decodeText } from '@/utils/decodeText'
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
			msgList() {
				return decodeText(this.msgData.content)
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		word-break: break-all;
		.msg-wrapper{
			display: inline-block;
		}
		.img{
			width: 25px;
			height: 25px;
		}
	}
</style>