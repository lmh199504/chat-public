<!-- 评论列表 -->
<template>
	<view class="comment-list">
		<view @click.stop="tapCommit(item)" class="comment-item" v-for="item in list" :key="item._id">
			<view>
				<text class="from-user" @click.stop="tapFrom(item)">{{ item.from_info.username }}</text>
				<text>回复</text>
				<text class="to-user" @click.stop="tapTo(item)">{{ item.to_info.username }}</text>
				<text>：</text>
				<text>{{ item.content }}</text>
			</view>
			<view class="create_time">
				{{ formatTime(item.create_time, '{y}-{m}-{d} {h}:{i}') }}
			</view>
		</view>
	</view>
</template>

<script>
	import { formatTime } from '@/utils/index.js'
	import { mapGetters } from 'vuex'
	export default{
		props: {
			list: {
				type: Array
			}
		},
		computed: {
			...mapGetters(['userId'])
		},
		methods: {
			formatTime,
			tapCommit(item) {
				// 不是自己
				if (item.from_info.id != this.userId) {
					this.$emit('commetToUser', item)
				}
			},
			// 点击发送者
			tapFrom(item) {
				uni.navigateTo({
					url: '/pages/userData/userData?id=' + item.from_info.id
				})
			},
			// 点击接收者
			tapTo(item) {
				uni.navigateTo({
					url: '/pages/userData/userData?id=' + item.to_info.id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.comment-list{
		margin-top: 10px;
		padding: 10px;
		background-color: #f7f7f7;
		border-radius: 10px;
		.comment-item{
			font-size: 14px;
			margin-bottom: 5px;
			&:last-child{
				margin-bottom: 0;
			}
			.from-user{
				color: #3c9cff;
				margin-right: 10px;
			}
			.to-user{
				color: #3c9cff;
				margin-left: 10px;
			}
			.create_time{
				margin-top: 5px;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>