<template>
	<view class="wrapper">
		<view class="mask" :class="!show?'':'mask-show'" :style="{backgroundColor:show?maskBg:'rgba(0,0,0,0)'}"
			@tap="tapMask">
			<view class="popups" :class="[theme]" :style="{top: popupsTop ,left: popupsLeft,flexDirection:direction}">
				<text :class="dynPlace" :style="{width:'0px',height:'0px'}" v-if="triangle"></text>
				<view v-for="(item,index) in popData" :key="index" @tap.stop="tapItem(item)" class="itemChild view"
					:class="[direction=='row'?'solid-right':'solid-bottom',item.disabled?'disabledColor':'']">
					<!-- <image class="image" :src="item.icon" v-if="item.icon"></image> -->
					<text class="iconfont" :class="item.icon" v-if="item.icon"></text>
					{{item.title}}
				</view>
				<slot name="content" />
			</view>
		</view>
		<view class="btn">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			maskBg: {
				type: String,
				default: 'rgba(0,0,0,0)'
			},
			placement: {
				type: String,
				default: 'default' //default top-start top-end bottom-start bottom-end 
			},
			direction: {
				type: String,
				default: 'column' //column row
			},
			x: {
				type: Number,
				default: 0
			},
			y: {
				type: Number,
				default: 0
			},
			value: {
				type: Boolean,
				default: false
			},
			popData: {
				type: Array,
				default: () => []
			},
			theme: {
				type: String,
				default: 'light' //light dark
			},
			dynamic: {
				type: Boolean,
				default: false
			},
			gap: {
				type: Number,
				default: 20
			},
			triangle: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				popupsTop: '0px',
				popupsLeft: '0px',
				show: false,
				dynPlace: ''
			}
		},
		methods: {
			tapMask() {
				this.$emit('input', !this.value)
			},
			tapItem(item) {
				if (item.disabled) return
				this.$emit('tapPopup', item)
				this.$emit('input', !this.value)
			},
			getPopData() {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.popups').boundingClientRect(data => {
						resolve(data)
					}).exec();
				})
			},
			async getPosition() {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.btn').boundingClientRect(async (data) => {
						const popupData = await this.getPopData()
						if (this.placement == 'top-end') {
							this.popupsLeft = data.left - popupData.width / 1.2 + 'px'
							this.popupsTop = data.top + 'px'
						} else if(this.placement == 'left') { // 左边 
							this.popupsLeft = data.left - popupData.width - 10 + 'px'
							this.popupsTop = data.top - popupData.height*1.2 + 'px'
						}
						resolve()
					}).exec();
				})
			}
		},
		watch: {
			value: {
				immediate: true,
				handler: async function(newVal, oldVal) {
					if (newVal) {
						await this.getPosition()
					}
					this.show = newVal
				}
			},
			placement: {
				immediate: true,
				handler(newVal, oldVal) {
					this.dynPlace = newVal
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper{
		display: inline;
	}
	.mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9999;
		transition: background 0.3s ease-in-out;
		visibility: hidden;

		&.mask-show {

			visibility: visible;
		}
	}

	.popups {
		position: absolute;
		padding: 20rpx;
		border-radius: 5px;
		display: flex;
		// margin-left: -200rpx;
		margin-top: 60rpx;
		.view {
			padding: 10rpx;
		}

		.image {
			display: inline-block;
			vertical-align: middle;
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}

		.iconfont {
			vertical-align: middle;
			margin-right: 20rpx;
		}
	}

	.dark {
		background-color: #4C4C4C;
		color: #fff;

		.top-start:after {
			content: "";
			position: absolute;
			top: -18rpx;
			left: 10rpx;
			border-width: 0 20rpx 20rpx;
			border-style: solid;
			border-color: transparent transparent #4C4C4C;
		}

		.top-end:after {
			content: "";
			position: absolute;
			top: -18rpx;
			right: 10rpx;
			border-width: 0 20rpx 20rpx;
			border-style: solid;
			border-color: transparent transparent #4C4C4C;
		}

		.bottom-start:after {
			content: "";
			position: absolute;
			bottom: -18rpx;
			left: 10rpx;
			border-width: 20rpx 20rpx 0;
			border-style: solid;
			border-color: #4C4C4C transparent transparent;

		}

		.bottom-end:after {
			content: "";
			position: absolute;
			bottom: -18rpx;
			right: 10rpx;
			border-width: 20rpx 20rpx 0;
			border-style: solid;
			border-color: #4C4C4C transparent transparent;
		}

		.disabledColor {
			color: #c5c8ce;
		}
	}

	.light {
		color: rgba(255, 255, 255, 0.8);
		box-shadow: 0upx 0upx 30upx rgba(0, 0, 0, 0.2);
		background: #4c4c4c;

		.top-start:after {
			content: "";
			position: absolute;
			top: -18rpx;
			left: 10rpx;
			border-width: 0 20rpx 20rpx;
			border-style: solid;
			border-color: transparent transparent #4c4c4c;
		}

		.top-end:after {
			content: "";
			position: absolute;
			top: -18rpx;
			right: 10rpx;
			border-width: 0 20rpx 20rpx;
			border-style: solid;
			border-color: transparent transparent #4c4c4c;
		}

		.bottom-start:after {
			content: "";
			position: absolute;
			bottom: -18rpx;
			left: 10rpx;
			border-width: 20rpx 20rpx 0;
			border-style: solid;
			border-color: #4c4c4c transparent transparent;

		}

		.bottom-end:after {
			content: "";
			position: absolute;
			bottom: -18rpx;
			right: 10rpx;
			border-width: 20rpx 20rpx 0;
			border-style: solid;
			border-color: #4c4c4c transparent transparent;
		}

		.disabledColor {
			color: #c5c8ce;
		}
	}

	.solid-bottom {
		border-bottom: 1px solid #585858;
	}

	.solid-right {

		border-right: 1px solid #585858;
	}

	.popups .itemChild:last-child {
		border: none;
	}
	.btn{
		display: inline;
	}
</style>
