/**
 * 好友请求处理
 */
const { requestFriendStatus } = require('../../utils/enum')
const FriendRequestModel = require('../../models/friend/friendrequest')
const FriendModel = require('../../models/friend/friend')
const md5 = require('blueimp-md5')
const getSocket = require('../../socket')
const msgType = require('../../socket/msgType')
const UserModel = require('../../models/user')
const { createSystemMsg } = require('../../socket/createMsg')
const MessageModel = require('../../models/conversation/message')
const UUID = require('uuid')
const checkConversation = require('../../socket/checkConversation')
module.exports = async (ctx) => {
    const { status, request_id } = ctx.request.body
    /**同意好友 */
    if (status === requestFriendStatus.agree) {
        await FriendRequestModel.updateOne({ request_id: request_id }, { status: requestFriendStatus.agree, is_read: true })
        const data = await FriendRequestModel.findOne({ request_id: request_id })
        // 同意人 是否存在好友
        const exists_to = await FriendModel.exists({ id: md5(data.to + data.from) })
        // 请求人 是否存在好友
        const exists_from = await FriendModel.exists({ id: md5(data.from + data.to) })
        if (exists_to) {
            // 被请求 更新
            await FriendModel.updateOne({ id: md5(data.to + data.from) }, {
                user_id: data.to,
                create_time: Date.now(),
                friend_id: data.from,
                remarkName: '',
                is_single: false
            })
        } else {
            // 被请求 好友列表插入
            await new FriendModel({
                user_id: data.to,
                create_time: Date.now(),
                friend_id: data.from,
                id: md5(data.to + data.from),
                remarkName: '',
                is_single: false
            }).save()
        }

        if (exists_from) {
            // 请求人
            await FriendModel.updateOne({ id: md5(data.from + data.to) }, {
                user_id: data.from,
                create_time: Date.now(),
                friend_id: data.to,
                remarkName: '',
                is_single: false
            })
        } else {
            // 请求人 好友列表插入
            await new FriendModel({
                user_id: data.from,
                create_time: Date.now(),
                friend_id: data.to,
                id: md5(data.from + data.to),
                remarkName: '',
                is_single: false
            }).save()
        }

        /**
         * 创建检查会话
         */
        await checkConversation(data.to, data.from)
        /**
         * 同意人给请求人发送消息
         */
        const result = await new MessageModel({
            from: data.to,
            to: data.from,
            msg_id: UUID.v1(),
            conversation_id: md5([data.to, data.from].sort().join('')), // 会话id
            content: '我已经同意了你的好意请求，快跟我聊天吧~', // 消息内容
            msgType: msgType.text
        }).save()
        // 请求人信息
        const userInfo = await UserModel.findOne({ user_id: data.to })
        const { clients } = getSocket()
        clients.forEach(ws => {
            if (ws.user_id == data.from) {
                const msg = createSystemMsg({
                    code: ctx.base_code.SUCCESS,
                    msg: userInfo.username + '同意了好友请求',
                    msgType: msgType.agree,
                    data: {
                        userInfo: userInfo
                    }
                })
                ws.send(msg)
                ws.send(JSON.stringify({
                   msgType: msgType.text,
                   data: result 
                }))
            }
            if (ws.user_id == data.to) {
                ws.send(JSON.stringify({
                    msgType: msgType.text,
                    data: result 
                 }))
            }
        })

        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: '已同意好友请求',
            msg: 'success'
        }
    } else if (status === requestFriendStatus.refuse) { /**拒绝 */
        await FriendRequestModel.updateOne({ request_id: request_id }, { status: requestFriendStatus.refuse, is_read: true })
        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: '已拒绝好友请求',
            msg: 'success'
        }
    } else {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '类型错误'
        }
    }
}