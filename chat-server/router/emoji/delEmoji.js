const EmojiModel = require('../../models/emoji/emoji')
module.exports = async (ctx) => {
    const { user_id } = ctx.request.user_id
    const { id } = ctx.request.body
    const result = await EmojiModel.deleteOne({ user_id: user_id, _id: id })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: result,
        msg: 'success'
    }
}