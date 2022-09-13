<template>
	<view>
		<u-navbar title="昵称修改" bgColor="#ededed" @leftClick="back" placeholder />
		<view class="main_content">
			<u-input v-model="text" placeholder="输入昵称..." confirmType="done" maxlength="10" count></u-input>
			<u-button class="btn" type="success" @click="changeName">确认修改</u-button>
		</view>
	</view>
</template>

<script>
	// 修改昵称
	import { mapGetters } from 'vuex'
	import { reqUpdateName } from '@/api/user'
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
			this.text = this.userInfo.username
		},
		methods: {
			async changeName() {
				await reqUpdateName({ username: this.text })
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
