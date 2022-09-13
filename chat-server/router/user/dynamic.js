/**
 * 发布动态
 */
const DynamicModel = require('../../models/dynamic')
const UUID = require('uuid')
const { DynamicType } = require('../../utils/enum')
module.exports = async (ctx) => {
    const { type, text, video, images } = ctx.request.body
    if (!type) {
        ctx.body = {
            code: ctx.base_code.ERROE,
            msg: '类型丢失'
        }
    } else {
        console.log(ctx.request.user_id)
        const data = {
            dynamic_type: type,
            dynamic_id: UUID.v1(),
            text: text,
            user_id: ctx.request.user_id.user_id,
            create_time: Date.now()
        }
        if (type == DynamicType.video) {
            data.video = video
        } 
        if (type == DynamicType.image) {
            data.dynamic_imgs = images.map(item => {
                return {
                    url: item.url
                }
            })
        }
        const saveData = await new DynamicModel(data, { password: 0, __v: 0 }).save()
        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: saveData,
            msg: '发布成功'
        }
    }
}