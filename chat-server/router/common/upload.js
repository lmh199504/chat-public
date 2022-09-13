const upload = require('../../utils/upload')
const UUID = require('uuid')
module.exports = async (ctx) => {
    // const list = []
    // for(const key in ctx.request.files) {
    //     const item = ctx.request.files[key]
    //     const result = await upload(key, item.filepath)
    //     list.push(result)
    // }
    const files = ctx.request.files
    // console.log(files)
	// 文件路径
	var filePath = files.file.path || files.file.filepath;
	// 文件类型
    const name = files.file.name || files.file.originalFilename
	var temp = name.split('.');
	var fileType = temp[temp.length - 1];
	var lastName = '.' + fileType;
	// 文件名
	var fileName = UUID.v1() + lastName;
    const result = await upload(fileName, filePath)
    if (result.res.status === 200) {
        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: result,
            msg: '上传成功'
        }
    } else {
        ctx.body = {
            code: ctx.base_code.ERROR,
            data: result,
            msg: '上传成功'
        }
    }
    
}