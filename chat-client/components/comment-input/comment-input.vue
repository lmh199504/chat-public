<template>
	<view>
		<view class="comment-input box-shadow">
			<view class="textarea">
				<u-textarea
					v-model="text" 
					fixed
					focus
					confirmType="done" 
					maxlength="200"
					height="20"
					:placeholder="placeholder" 
					@confirm="confirm"
					@focus="inputFocus"
					@blur="inputBlur"
				/>
			</view>
			<view class="btn">
				<u-button type="success" :disabled="!text" @click="confirm">发送</u-button>
			</view>
		</view>
		<view class="mask" @click="hide"></view>
	</view>
</template>

<script>
	export default{
		props: {
			placeholder: {
				type: String,
				default: '说点什么...'
			}
		},
		data() {
			return {
				text: ''
			}
		},
		methods: {
			confirm() {
				const trimText = this.text.trim()
				if (!trimText) {
					uni.showToast({
						title: '评论不能为空',
						icon: 'error'
					})
				} else {
					this.$emit('confirm', trimText)
				}
			},
			inputFocus() {
				
			},
			inputBlur() {
				
			},
			hide() {
				this.$emit('hide')
			}
		}
	}
</script>

<style scoped lang="scss">
	.comment-input{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
		z-index: 2;
		padding-bottom: calc(constant(safe-area-inset-bottom) + 15px);
		padding-bottom: calc(env(safe-area-inset-bottom) + 15px);
		.textarea{
			flex: 1;
		}
		.btn{
			margin-left: 10px;
			width: 70px;
			flex-shrink: 0;
		}
	}
	.mask{
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		height: 100%;
		z-index: 1;
	}
</style>