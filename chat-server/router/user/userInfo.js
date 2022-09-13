// 获取用户信息
const UserModel = require('../../models/user')
module.exports = async (ctx, next) => {
    const { user_id } = ctx.request.user_id
    const data = await UserModel.findOne({ id: user_id},  { password: 0 })
    if (data) {
        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: data,
            msg: '操作成功'
        }
    } else {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '用户不存在'
        }
    }
}