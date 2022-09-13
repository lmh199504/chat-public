// 查找好友
const UserModel = require('../../models/user')
module.exports = async (ctx) => {
    const { keyword } = ctx.request.query
    const result = await UserModel.findOne({
        $or: [
            { account: { $eq: keyword } },
            { chat_id: { $eq: keyword } }
        ]
    }, { password: 0 })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: result,
        msg: 'success'
    }
}