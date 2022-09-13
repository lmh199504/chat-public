<template>
	<view>
		<!-- #ifdef APP -->
		<view class="send-box box-shadow" :style="paddingStyle">
		<!-- #endif -->
		<!-- #ifndef APP -->
		<view class="send-box box-shadow">
		<!-- #endif -->
			<view class="input-box">
				<!-- #ifndef H5 -->
				<text v-show="!showRecord" class="iconfont icon-yuyin" @click="switchRecord"></text>
				<text v-show="showRecord" class="iconfont icon-jianpan" @click="switchRecord"></text>
				<!-- #endif -->
				<view class="textarea" v-show="!showRecord">
					<u-textarea v-model="text" autoHeight fixed confirmType="done" maxlength="200" placeholder="说点什么..."
						@confirm="sendTextMsg" @focus="inputFocus" @blur="inputBlur" />
				</view>
				<view class="textarea" v-show="showRecord">
					<record-box @sendRecord="sendRecord"></record-box>
				</view>
				<text class="iconfont icon-xiaolian" @click="switchEmoji"></text>
				<u-icon v-show="!text" name="plus-circle" size="30" @click="switchTool"></u-icon>
				<view v-show="text" class="send-btn">
					<u-button @click="sendTextMsg" type="success" size="mini">发送</u-button>
				</view>
			</view>
			<!-- 表情 -->
			<view class="emoji-box" :class="[showEmoji ? 'emoji-box-show': 'emoji-box-hide']">
				<EmojiBox @chooseEmoji="chooseEmoji" @chooseUserEmoji="chooseUserEmoji"></EmojiBox>
			</view>
			<!-- 工具 -->
			<view class="tool-box" :class="[showTool ? 'show-tool-box': 'hide-tool-box']">
				<u-row :gutter="40">
					<u-col :span="3">
						<view class="icon-wrapper" @click="chooseImage">
							<view class="icon-inner">
								<u-icon name="photo" size="30"></u-icon>
							</view>
						</view>
					</u-col>
					<u-col :span="3">
						<view class="icon-wrapper" @click="chooseVideo">
							<view class="icon-inner">
								<u-icon name="camera" size="30"></u-icon>
							</view>
						</view>
					</u-col>
					<u-col :span="3">
						<view class="icon-wrapper">
							<view class="icon-inner">
								<u-icon name="photo" size="30"></u-icon>
							</view>
						</view>
					</u-col>
					<u-col :span="3">
						<view class="icon-wrapper">
							<view class="icon-inner">
								<u-icon name="photo" size="30"></u-icon>
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="mask" v-show="showMask" @click="hideMask"></view>
	</view>
</template>

<script>
	import {
		connectSocket
	} from '@/socket'
	import msgType from '@/socket/msgType'
	import {
		mapGetters
	} from 'vuex'
	import {
		upload
	} from '@/api/common.js'
	import EmojiBox from './emoji-box.vue'
	import RecordBox from './record-box.vue'
	export default {
		components: {
			EmojiBox,
			RecordBox
		},
		props: {
			to: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				text: '',
				socket: null,
				showTool: false, // 工具
				showMask: false, // 遮罩
				showEmoji: false, // 表情
				showRecord: false, // 录音
				paddingBottom: 0
			}
		},
		computed: {
			...mapGetters(['userId']),
			paddingStyle() {
				return {
					'bottom': this.paddingBottom + 'px'
				}
			}
		},
		created() {
			this.getSocket()
		},
		mounted() {
			// 监听键盘高度
			// #ifndef H5
			uni.onKeyboardHeightChange(this.keyboardHeightChange)
			// #endif
		},
		beforeDestroy() {
			// #ifndef H5
			uni.offKeyboardHeightChange(this.keyboardHeightChange)
			// #endif
		},
		methods: {
			keyboardHeightChange(res) {
				this.paddingBottom = res.height ? 15 : 0
			},
			/**
			 * @param {string} content 消息内容
			 * @param {string} type 消息类型
			 * */
			sendMsg(content, type) {
				const data = {
					msgType: type,
					content: content,
					to: this.to,
					from: this.userId
				}
				this.socket.send({
					data: JSON.stringify(data),
					success: (res) => {
						this.$emit('success')
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			sendTextMsg() {
				if (!this.text.trim()) {
					return uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})
				}
				this.sendMsg(this.text, msgType.text)
				this.text = ''
			},
			getSocket() {
				this.socket = connectSocket()
			},
			// 选择图片
			chooseImage() {
				uni.chooseImage({
					count: 9,
					extension: ['jpg', 'png'],
					compressed: false,
					success: async (res) => {
						try {
							uni.showLoading({
								title: '上传中...',
								mask: true
							})
							for (let i = 0; i < res.tempFiles.length; i++) {
								const item = res.tempFiles[i]
								const result = await upload(item.path)
								this.sendMsg(result.url, msgType.image)
							}
							uni.hideLoading()
						} catch (e) {
							//TODO handle the exception
							uni.hideLoading()
						}
					}
				})
			},
			// 选择视频
			chooseVideo() {
				uni.chooseVideo({
					count: 1,
					extension: ['mp4'],
					compressed: false,
					success: async (res) => {
						try {
							uni.showLoading({
								title: '上传中...',
								mask: true
							})
							const result = await upload(res.tempFilePath)
							this.sendMsg(result.url, msgType.video)
							uni.hideLoading()
						} catch (e) {
							//TODO handle the exception
							uni.hideLoading()
						}
					}
				})
			},
			switchTool() {
				this.showEmoji = false
				this.showTool = true
				this.showMask = true
				setTimeout(() => {
					this.$emit('changeHeight')
				}, 400)
			},
			switchEmoji() {
				this.showTool = false
				this.showEmoji = true
				this.showMask = true
				setTimeout(() => {
					this.$emit('changeHeight')
				}, 400)
			},
			getHeight() {
				return new Promise((resolve, reject) => {
					this.$nextTick(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('.send-box').boundingClientRect(data => {
							resolve(data)
						}).exec();
					})
				})
			},
			// 点击遮罩 时隐藏
			hideMask() {
				this.showEmoji = false
				this.showTool = false
				this.showMask = false
				setTimeout(() => {
					this.$emit('changeHeight')
				}, 400)
			},
			inputFocus(e) {
				// console.log(e)
				// this.paddingBottom = 200
				this.hideMask()
			},
			inputBlur(e) {
				// console.log(e)
				// this.paddingBottom = 0
				this.hideMask()
			},
			chooseEmoji(emoji) {
				this.text += emoji
			},
			// 自定义表情包选择
			chooseUserEmoji(url) {
				this.sendMsg(url, msgType.image)
			},
			switchRecord() {
				this.hideMask()
				this.showRecord = !this.showRecord
			},
			sendRecord(data) {
				this.sendMsg(JSON.stringify(data), msgType.sound)
			}
		}
	}
</script>

<style scoped lang="scss">
	.send-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #f7f7f7;
		z-index: 2;
		padding-bottom: calc(constant(safe-area-inset-bottom));
		padding-bottom: calc(env(safe-area-inset-bottom));

		.input-box {
			display: flex;
			padding: 10px;
			align-items: center;

			.textarea {
				flex: 1;
			}

			.iconfont {
				flex-shrink: 0;
				font-size: 30px;
				margin: 5px;
			}

			.send-btn {
				width: 50px;
				margin-left: 5px;
			}

			.send-btn-active {
				width: 50px;
			}
		}

		.tool-box {
			box-sizing: border-box;
			padding: 30px;
			background: #ededed;
			transition: all 0.4s ease;

			.icon-wrapper {
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				padding-bottom: 100%;
				border-radius: 10px;
				position: relative;

				.icon-inner {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}

		.hide-tool-box {
			height: 0;
			overflow: hidden;
			padding: 0;
		}

		.show-tool-box {
			height: 200px;
			overflow: auto;
		}

		.emoji-box {
			background: #ededed;
			box-sizing: border-box;
			transition: all 0.4s ease;
		}

		.emoji-box-show {
			height: 200px;
			// padding: 30px;
			overflow: auto;
		}

		.emoji-box-hide {
			height: 0px;
			padding: 0px;
			overflow: hidden;
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
