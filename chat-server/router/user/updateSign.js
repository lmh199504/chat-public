const UserModel = require('../../models/user')
module.exports = async (ctx) => {
    const { sign } = ctx.request.body
    const { user_id } = ctx.request.user_id
    const result = await UserModel.updateOne({ id: user_id }, { sign: sign })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: result,
        msg: 'success'
    }
}