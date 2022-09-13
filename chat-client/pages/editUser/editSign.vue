<template>
	<view>
		<u-navbar title="编辑签名" bgColor="#ededed" @leftClick="back" placeholder />
		<view class="main_content">
			<u-textarea v-model="text" placeholder="输入签名..." confirmType="done" maxlength="30" count></u-textarea>
			<u-button class="btn" type="success" @click="changeSign">确认修改</u-button>
		</view>
	</view>
</template>

<script>
	// 编辑签名
	import { mapGetters } from 'vuex'
	import { reqUpdateSign } from '@/api/user'
	export default {
		data() {
			return {
				text: ''
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		created() {
			this.text = this.userInfo.sign || ''
		},
		methods: {
			async changeSign() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				await reqUpdateSign({ sign: this.text })
				uni.showToast({
					title: '修改成功'
				})
				uni.navigateBack()
				this.$store.dispatch('user/getInfo')
			}
		}
	}
</script>

<style scoped lang="scss">
	.main_content {
		padding: 15px;
		.btn{
			margin-top: 30px;
		}
	}
</style>
