<template>
	<view class="content">
		<view class="logo">
			<image class="logo-img" src="@/static/logo.jpg" mode="widthFix"></image>
		</view>
		<view class="form-wrapper">
			<u-form :model="form" ref="form">
				<u-form-item label="昵称:" prop="username" required>
					<u-input v-model="form.username" maxlength="20"></u-input>
				</u-form-item>
				<u-form-item label="账号:" prop="account" required>
					<u-input v-model="form.account" maxlength="20"></u-input>
				</u-form-item>
				<u-form-item label="密码:" prop="password" required>
					<u-input v-model="form.password" type="password" maxlength="20"></u-input>
				</u-form-item>
				<view class="text-btns">
					<view class=""></view>
					<view class="btns" @click="toLogin">
						返回登录
					</view>
				</view>
				<u-button type="primary" @click="validate" round :loading="btnLoading">立即注册</u-button>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnLoading: false,
				form: {
					account: '',
					password: ''
				},
				rules: {
					username: [
						{
							required: true,
							message: '昵称',
							trigger: ['change','blur']
						}
					],
					account: [
						{
							required: true,
							message: '账号',
							trigger: ['change','blur']
						}
					],
					password: [
						{
							required: true,
							message: '密码',
							trigger: ['change','blur']
						}
					]
				}
			}
		},
		methods: {
			login() {
				this.btnLoading = true
				uni.showLoading({
					title: '登录中...'
				})
				this.$store.dispatch('user/regiter', this.form)
				.then(res => {
					this.btnLoading = false
					uni.hideLoading()
					uni.reLaunch({
						url: '/pages/index/index'
					})
				})
				.catch(() => {
					uni.hideLoading()
					this.btnLoading = false
				})
			},
			validate() {
				this.$refs.form.validate()
				.then(() => {
					this.login()
				})
				.catch(() => {
					
				})
			},
			toLogin() {
				uni.navigateBack()
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules);
		}
	}
</script>

<style scoped lang="scss">
.content{
	padding: 60rpx;
	.logo{
		display: flex;
		align-items: center;
		justify-content: center;
		.logo-img{
			width: 350rpx;
			border-radius: 20rpx;
		}
	}
	.form-wrapper{
		padding: 40rpx;
		.text-btns{
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.btns{
				color: $uni-color-primary;
				font-size: 24rpx;
			}
		}
	}
}
</style>
