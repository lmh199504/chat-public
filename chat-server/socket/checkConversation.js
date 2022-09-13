/**
 * 
 * @param {string} to  // 接受消息方id
 * @param {string} from  // 发送消息方id
 */
const ConversationModel = require('../models/conversation/conversation')
const md5 = require('blueimp-md5')
module.exports = async (to, from) => {
    // 同意人是否有会话
    const conversation_id = md5([from, to].sort().join(''))
    const exists_to_con = await ConversationModel.exists({ conversation_id: conversation_id, user_id: to })
    // 请求人是否有会话
    const exists_from_con = await ConversationModel.exists({ conversation_id: conversation_id, user_id: from })
    // 已经存在同意人会话
    if (exists_to_con) {
        await ConversationModel.updateOne({ conversation_id: conversation_id, user_id: to }, { is_del: false, update_time: Date.now() })
    } else {
        await new ConversationModel({
            conversation_id: conversation_id,
            create_time: Date.now(),
            user_id: to,
            update_time: Date.now(),
            friend_id: from
        }).save()
    }
    // 已经存在请求人会话
    if (exists_from_con) {
        await ConversationModel.updateOne({ conversation_id: conversation_id, user_id: from }, { is_del: false, update_time: Date.now() })
    } else {
        await new ConversationModel({
            conversation_id: conversation_id,
            create_time: Date.now(),
            user_id: from,
            update_time: Date.now(),
            friend_id: to
        }).save()
    }
}