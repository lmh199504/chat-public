<template>
	<view class="message_bubble" :class="[
		position == 'left' ? 'bubble_left' : position == 'right' ? 'bubble_right' : 'bubble_none',
		color == 'white' ? 'bubble_white' : color == 'green' ? 'bubble_green' : 'bubble_no_color'
	]">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * @property {String} position = [none|left|right]	气泡位置 默认 left 
	 * @property {String} color = [white|green]	气泡颜色 默认 white
	 */
	export default {
		props: {
			position: {
				type: String,
				default: 'left'
			},
			color: {
				type: String,
				default: 'white'
			}
		}
	}
</script>

<style scoped lang="scss">
	.message_bubble {
		width: fit-content;
		border-radius: 5px;
		padding: 10px;
		box-sizing: border-box;
		font-size: 15px;
		min-width: 0;
		position: relative;
	}

	.bubble_none {
		margin-right: 20px;
	}

	.bubble_right {
		margin-right: 20px;
		&::before {
			content: '';
			display: block;
			width: 0;
			height: 0;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			border-left-width: 10px;
			border-left-style: solid;
			border-left-color: transparent;
			position: absolute;
			right: -8px;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.bubble_left {
		margin-left: 20px;
		&::before {
			content: '';
			display: block;
			width: 0;
			height: 0;
			position: absolute;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			left: -8px;
			border-right-width: 10px;
			border-right-style: solid;
			border-right-color: transparent;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.bubble_white {
		background-color: #fff;
		color: #333;
		&::before {
			border-right-color: #fff;
			border-left-color: #fff;
		}
	}

	.bubble_green {
		background-color: #89d961;
		color: #fff;
		&::before {
			border-right-color: #89d961;
			border-left-color: #89d961;
		}
	}
	.bubble_no_color{
		background-color: transparent;
	}
</style>
