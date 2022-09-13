/**
 * 删除动态
 */
const DynamicModel = require('../../models/dynamic')
module.exports = async (ctx) => {
    const { dynamic_id } = ctx.request.body
    const { user_id } = ctx.request.user_id
    const data = await DynamicModel.updateOne({ dynamic_id: dynamic_id, user_id: user_id }, { is_del: true })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: data,
        msg: 'success'
    }
}