<template>
	<view class="emoji-box">
		<scroll-view class="scroll-view" scroll-x="true">
			<view class="switch-icon-wrapper">
				<view class="icon-wrapper" :class="{ 'icon-wrapper-active': active == 1 }" @click="switchTab(1)">
					<text class="iconfont icon-xiaolian"></text>
				</view>
				<view class="icon-wrapper" :class="{ 'icon-wrapper-active': active == 2 }" @click="switchTab(2)">
					<text class="iconfont icon-aixin1"></text>
				</view>
			</view>
		</scroll-view>
		<view class="content">
			<!-- 表情包 -->
			<view v-show="active == 1" class="">
				<u-row customStyle="flex-wrap: wrap;" class="flex-wrap">
				    <u-col v-for="item in emojiName" :span="2" :key="item">
				        <view class="emoji-wrapper" @click="chooseEmoji(item)">
				            <u-image width="30px" height="30px" :src="emojiUrl + emojiMap[item]" class="emoji_img" />
				        </view>
				    </u-col>
				</u-row>
			</view>
			<!-- 自定义表情 -->
			<view v-show="active == 2">
				<u-row customStyle="flex-wrap: wrap;" :gutter="15">
					<u-col :span="2">
						<view class="user-emoji">
							<view @click="chooseImage" class="user-emoji-inner add-btn">
								<u-icon name="plus"></u-icon>
							</view>
						</view>
					</u-col>
					<u-col :span="2" v-for="item in emojiList" :key="item._id">
						<view class="user-emoji">
							<view class="user-emoji-inner" @click="chooseUserEmoji(item.url)" @longpress="showAction(item)">
								<image class="emoji-img" :src="item.url" mode="aspectFill"></image>
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	import { emojiUrl, emojiMap, emojiName } from '@/utils/emojiMap'
	import { reqCreateEmoji } from '@/api/emoji'
	import { upload } from '@/api/common'
	import { mapGetters } from 'vuex'
	export default{
		data() {
			return {
				emojiUrl, 
				emojiMap, 
				emojiName,
				active: 1
			}
		},
		computed: {
			...mapGetters(['emojiList'])
		},
		methods: {
			chooseEmoji(item) {
				this.$emit('chooseEmoji', item)
			},
			switchTab(index) {
				this.active = index
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: async (res) => {
						try{
							uni.showLoading({
								title: '上传中...',
								mask: true
							})
							for(let i = 0; i < res.tempFiles.length;i++) {
								const item = res.tempFiles[i]
								const result = await upload(item.path)
								await this.$store.dispatch('emoji/addEmoji', result.url)
							}
							uni.hideLoading()
						}catch(e){
							console.log(e)
							uni.hideLoading()
						}
					}
				})
			},
			chooseUserEmoji(url) {
				this.$emit('chooseUserEmoji', url)
			},
			showAction(item) {
				uni.showActionSheet({
					itemList: ['删除', '置顶'],
					success: (res) => {
						if (res.tapIndex == 0) {
							this.$store.dispatch('emoji/delEmoji', item._id)
						} else if (res.tapIndex == 1) {
							this.$store.dispatch('emoji/topEmoji', item._id)
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.emoji-box{
		height: 100%;
		display: flex;
		overflow: hidden;
		flex-direction: column;
	}
	.scroll-view{
		background: #f7f7f7;
		padding: 5px 15px;
		.switch-icon-wrapper{
			display: flex;
			.icon-wrapper{
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				border-radius: 5px;
			}
			.icon-wrapper-active{
				background-color: #fff;
			}
			.iconfont{
				font-size: 26px;
			}
		}
	}
	.content{
		flex: 1;
		overflow-y: auto;
		padding: 10px;
		/deep/ .u-row{
			flex-wrap: wrap!important;
		}
		.flex-wrap{
			flex-wrap: wrap!important;
		}
		.emoji-wrapper{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.user-emoji{
			position: relative;
			width: 100%;
			padding-bottom: 100%;
			margin-bottom: 10px;
			.add-btn{
				border: 1px dashed #606266;
				border-radius: 5px;
			}
			.user-emoji-inner{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.emoji-img{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>