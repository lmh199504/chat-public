/**
 * 更新背景
 */
const UserModel = require('../../models/user')
module.exports = async (ctx) => {
    const { url } = ctx.request.body
    const { user_id } = ctx.request.user_id
    if (!url) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            data: '请上传背景',
            msg: 'success'
        }
    } else {
        const result = await UserModel.updateOne({ id: user_id }, { background: url })
        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: result,
            msg: 'success'
        }
    }
}