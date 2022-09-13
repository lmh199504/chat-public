<template>
	<view class="like-list">
		<view>
			<u-icon name="thumb-up" size="20" color="#3c9cff"></u-icon>
		</view>
		<view class="like-user" v-for="(item, index) in list" :key="item.id">
			<text class="">
				{{ item.username }}
				<text v-if="index+1 != list.length">、</text>
			</text>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			list: {
				type: Array
			}
		}
	}
</script>

<style scoped lang="scss">
	.like-list{
		display: flex;
		flex-wrap: wrap;
		margin-top: 15px;
		align-items: center;
		.like-user{
			font-size: 12px;
			color: #3c9cff;
		}
	}
</style>