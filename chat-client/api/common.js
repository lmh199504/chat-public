import { baseURL } from '@/config/index.js'
import { getToken } from '@/utils/auth.js'

export const upload = (filePath) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseURL + '/common/upload',
			header: {
				authorization: getToken()
			},
			filePath: filePath,
			name: 'file',
			success(res) {
				try{
					const data = JSON.parse(res.data)
					console.log(data)
					if (data.code == 0) {
						resolve(data.data)
					} else {
						reject('上传失败')
					}
				}catch(e){
					//TODO handle the exception
					reject('上传失败')
				}
			},
			fail(err) {
				reject('上传失败')
			}
		})
	})
}