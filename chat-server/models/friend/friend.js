/**
 * 好友列表
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const friendSchema = new Schema({
    user_id: { type: String }, // 用户id
    friend_id: { type: String }, // 用户好友的id
    create_time: { type: Number, default: () => { return Date.now() } }, // 同意时间
    id: { type: String }, // 唯一标识 user_id + friend_id 的 md5
    remarkName: { type: String }, // 备注名称
    is_single: { type: Boolean, default: false } // 单向好友
})

const FriendModel = mongoose.model('friend', friendSchema);

module.exports = FriendModel

// FriendModel.updateMany({ __v: 0 }, { is_single: false }, function(res, err) {
//     console.log(res)
//     console.log(err)
// })