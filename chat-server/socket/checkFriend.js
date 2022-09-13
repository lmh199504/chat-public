/**
 * 检查是否互相为好友
 */
const FriendModel = require('../models/friend/friend')
module.exports = async (to, from) => {
    const exists_to = await FriendModel.exists({ user_id: to, friend_id: from, is_single: false })
    const exists_from = await FriendModel.exists({ user_id: from, friend_id: to, is_single: false })
    return exists_to && exists_from
}