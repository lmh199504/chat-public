
/**
 * 创建表情包
 * @param {*} ctx 
 */

const EmojiModel = require('../../models/emoji/emoji')
module.exports = async (ctx) => {
    const { user_id } = ctx.request.user_id
    const { url } = ctx.request.body
    const result = await new EmojiModel({
        create_time: Date.now(),
        user_id: user_id,
        url: url,
        update_time: Date.now()
    }).save()
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: result,
        msg: 'success'
    }
}