<template>
	<view>
		<u-navbar title="信息编辑" bgColor="#ededed" @leftClick="back" placeholder></u-navbar>
		<u-cell-group>
			<u-cell icon="account" title="头像" :isLink="true">
				<template slot="value">
					<yq-avatar
						ref="yqavatar"
						selWidth="200px" selHeight="200px" @upload="myUpload" 
						:avatarSrc="userInfo.avatar"
						avatarStyle="width: 50px; height: 50px; border-radius: 10px;"
					/>
				</template>
			</u-cell>
			<u-cell icon="account" title="昵称" :isLink="true" @click="editNmae">
				<template slot="value">
					<view class="attr-value">{{ userInfo.username }}</view>
				</template>
			</u-cell>
			<u-cell icon="edit-pen" title="个性签名" :isLink="true" @click="editSign">
				<template slot="value">
					<view class="attr-value">{{ userInfo.sign || '暂无' }}</view>
				</template>
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	import { upload } from '@/api/common'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			async myUpload(res) {
				const result = await upload(res.path)
				uni.showToast({
					title: '修改成功'
				})
				uni.navigateBack()
				this.$store.dispatch('user/updateAvatar', result.url)
			},
			editNmae() {
				uni.navigateTo({
					url: '/pages/editUser/editName'
				})
			},
			editSign() {
				uni.navigateTo({
					url: '/pages/editUser/editSign'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.attr-value{
	max-width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
