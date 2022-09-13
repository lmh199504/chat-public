<template>
	<view>
		<u-image :src="src" width="40px" height="40px" radius="5"></u-image>
	</view>
</template>

<script>
	export default{
		props: {
			src: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>
</style>