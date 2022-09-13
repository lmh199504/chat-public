/**
 * 发送评论
 */
const CommnetModel = require('../../models/commnet')
module.exports = async (ctx) => {
    const { user_id } = ctx.request.user_id
    const { content, dynamic_id, to } = ctx.request.body
    if (!content || !dynamic_id) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '参数错误'
        }
    } else {
        const data = await new CommnetModel({
            from: user_id,
            create_time: Date.now(),
            to: to,
            content: content,
            dynamic_id: dynamic_id
        }).save()
        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: data,
            msg: 'success'
        }
    }
}