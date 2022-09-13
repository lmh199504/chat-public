<template>
	<view class="content">
		<view class="logo">
			<image class="logo-img" src="@/static/logo.jpg" mode="widthFix"></image>
		</view>
		<view class="form-wrapper">
			<u-form :model="form" ref="form">
				<u-form-item label="账号:" prop="account" required>
					<u-input v-model="form.account" maxlength="20"></u-input>
				</u-form-item>
				<u-form-item label="密码:" prop="password" required>
					<u-input v-model="form.password" type="password" maxlength="20"></u-input>
				</u-form-item>
				<view class="text-btns">
					<view class=""></view>
					<view class="btns" @click="toRegister">
						去注册
					</view>
				</view>
				<u-button type="primary" @click="validate" round :loading="btnLoading">登录</u-button>
			</u-form>
		</view>
	</view>
</template>

<script>
	import { connectSocket } from '@/socket'
	export default {
		data() {
			return {
				btnLoading: false,
				form: {
					account: '',
					password: ''
				},
				rules: {
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
				this.$store.dispatch('user/login', this.form)
				.then(res => {
					this.savePassword()
					this.btnLoading = false
					uni.hideLoading()
					connectSocket()
					uni.reLaunch({
						url: '/pages/index/index'
					})
				})
				.catch(() => {
					// uni.hideLoading()
					this.btnLoading = false
				})
			},
			validate() {
				this.$refs.form.validate()
				.then(() => {
					this.login()
				})
			},
			toRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			savePassword() {
				uni.setStorage({
					key: 'user_account',
					data: this.form
				})
			},
			getPassword() {
				const data = uni.getStorageSync('user_account')
				this.form.account = data.account
				this.form.password = data.password
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules);
		},
		onBackPress() {
			console.log('返回')
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
