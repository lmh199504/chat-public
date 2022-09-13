/**
 * 会话
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const converSationSchema = new Schema({
    conversation_id: { type: String, required: true },
    user_id: { type: String, required: true },
    is_top: { type: Boolean, default: false }, // 是否置顶
    create_time: { type: Number },
    is_del: { type: Boolean, default: false }, // 是否删除会话
    update_time: { type: Number }, // 更新时间
    friend_id: { type: String, required: true }
})

const ConversationModel = mongoose.model('conversation', converSationSchema)

module.exports = ConversationModel