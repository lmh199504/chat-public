/**
 * 点赞
 * like 1 喜欢 2不喜欢
 */
const DynamicLikeModel = require('../../models/commnet/like')
module.exports = async (ctx) => {
    const { user_id } = ctx.request.user_id
    const { dynamic_id } = ctx.request.body

    const find = await DynamicLikeModel.findOne({ dynamic_id: dynamic_id, user_id: user_id })
    if (find) {
        await DynamicLikeModel.deleteOne({
            dynamic_id: dynamic_id,
            user_id: user_id,
        })
    } else {
        await new DynamicLikeModel({
            dynamic_id: dynamic_id,
            user_id: user_id,
            create_time: Date.now()
        }).save()
    }
    
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        msg: 'success'
    }
}