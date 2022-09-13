/**
 * 设置消息为已读
 */
const MessageModel = require('../../models/conversation/message')
module.exports = async (ctx) => {
    const { conversation_id } = ctx.request.body
    const { user_id } = ctx.request.user_id

    const result = await MessageModel.updateMany({
        conversation_id: conversation_id,
        to: user_id
    }, {
        is_read: true
    })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: result,
        msg: 'success'
    }
}