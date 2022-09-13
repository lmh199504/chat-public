
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    dynamic_id: { type: String }, // 动态id
    to: { type: String }, // 发送给谁 
    from: { type: String, required: true }, // 谁发送的
    content: { type: String, required: true }, // 评论内容
    create_time: { type: Number, rquired: true } // 评论时间
})

const CommentModel = mongoose.model('comment', commentSchema);

module.exports = CommentModel