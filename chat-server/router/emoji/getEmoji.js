
const EmojiModel = require('../../models/emoji/emoji')

module.exports = async (ctx) => {
    const { user_id } = ctx.request.user_id
    const list = await EmojiModel.find(
        { user_id: user_id }
    ).sort({ update_time: -1 })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: list,
        msg: 'success'
    }
}