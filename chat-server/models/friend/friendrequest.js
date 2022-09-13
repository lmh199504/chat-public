const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
    from: { type: String }, // 来自谁
    to: { type: String }, // 发送给谁
    create_time: { type: Number, default: () => { return Date.now() } },
    status: { type: String }, // 同意、拒绝、未操作 agree refuse undo
    is_read: { type: Boolean, default: false }, // 是否已读
    msg: { type: String }, // 验证消息
    request_id: { type: String, unique: true } // md5(from + to) 
})

const FriendRequestModel = mongoose.model('friendRequest', friendRequestSchema);

module.exports = FriendRequestModel