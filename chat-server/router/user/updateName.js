const UserModel = require('../../models/user')
module.exports = async (ctx) => {
    const { username } = ctx.request.body
    const { user_id } = ctx.request.user_id
    const result = await UserModel.updateOne({ id: user_id }, { username: username })
        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: result,
            msg: 'success'
        }
}