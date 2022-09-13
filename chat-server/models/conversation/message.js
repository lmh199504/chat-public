/**
 * 聊天消息
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
    from: { type: String, required: true }, // 发送者
    to: { type: String, required: true }, // 接收者
    msg_id: { type: String, required: true, unique: true }, // 消息id
    conversation_id: { type: String, required: true }, // 会话id
    is_revoke: { type: Boolean, default: false }, // 撤销
    from_del: { type: Boolean, default: false }, // 发送者删除
    to_del: { type: Boolean, default: false }, // 接收者删除
    content: { type: String, required: true }, // 消息内容
    msgType: { type: String, required: true }, // 消息类型
    is_fail: { type: Boolean, default: false }, // 是否发送失败
    create_time: { type: Number, default: () => { return Date.now() }, required: true },
    is_read: { type: Boolean, default: false } // 是否已读
})

const MessageModel = mongoose.model('message', messageSchema)

module.exports = MessageModel