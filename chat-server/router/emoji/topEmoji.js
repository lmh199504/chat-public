
const EmojiModel = require('../../models/emoji/emoji')
module.exports = async (ctx) => {
    const { id } = ctx.request.body
    const { user_id } = ctx.request.user_id
    const data = await EmojiModel.updateOne({ _id: id, user_id: user_id }, { update_time: Date.now() })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: data,
        msg: 'success'
    }
}