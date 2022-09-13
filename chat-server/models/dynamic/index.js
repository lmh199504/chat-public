const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const dynamicSchema = new Schema({
    user_id: { type: String }, // 用户id
    create_time: { type: Number, default: Date.now() }, // 创建时间
    dynamic_type: { type: String, require: true }, // 动态类型
    dynamic_id: { type: String, require: true, unique: true }, // 动态id
    dynamic_imgs: { type: Array },
    text: { type: String, default: '' }, // 动态文本
    video: { type: String, default: '' },
    is_del: { type: Boolean, default: false } // 是否删除的
})

dynamicSchema.index({ id: 1 })

const DynamicModel = mongoose.model('Dynamic', dynamicSchema);

module.exports = DynamicModel


// DynamicModel.updateMany({ __v:0 }, { is_del: false }, (res, err) => {
//     console.log(err)
// })