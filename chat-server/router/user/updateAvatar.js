const UserModel = require('../../models/user')
module.exports = async (ctx) => {
    const { url } = ctx.request.body
    const { user_id } = ctx.request.user_id
    if (url) {
        const result = await UserModel.updateOne({ id: user_id }, { avatar: url })
        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: result,
            msg: 'success'
        }
    } else {
        ctx.body = {
            code: ctx.base_code.ERROR,
            data: '请上传头像',
            msg: 'success'
        }
    }
}