
export default{
	methods: {
		back() {
			const page = getCurrentPages()
			if (page.length == 1) {
				uni.switchTab({
					url: '/pages/index/index'
				})
			} else {
				uni.navigateBack()
			}
		}
	}
}