
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dynamicLike = new Schema({
    dynamic_id: { type: String, required: true }, // 动态id
    user_id: { type: String, required: true },
    create_time: { type: Number }
})

const DynamicLikeModel = mongoose.model('dynamiclike', dynamicLike);

module.exports = DynamicLikeModel