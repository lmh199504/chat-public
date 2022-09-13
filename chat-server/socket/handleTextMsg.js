const UUID = require('uuid')
const md5 = require('blueimp-md5')
const msgType = require('./msgType')
const checkFriend = require('./checkFriend')
const checkConversation = require('./checkConversation')
const MessageModel = require('../models/conversation/message')
const { createTextMsg } = require('./createMsg')
module.exports = async (data, wss) => {
    // 好友检查
    const is_friend = await checkFriend(data.to, data.from)
    // 会话检查
    await checkConversation(data.to, data.from)
    if (is_friend) {
        await createTextMsg(data, wss)
    } else {
        const result = await new MessageModel({
            from: data.from,
            to: data.to,
            msg_id: UUID.v1(),
            conversation_id: md5([data.from, data.to].sort().join('')),
            create_time: Date.now(),
            content: data.content,
            msgType: data.msgType,
            is_fail: true
        }).save()

        const systemMsg = await new MessageModel({
            from: 'system',
            to: data.to,
            msg_id: UUID.v1(),
            conversation_id: md5([data.from, data.to].sort().join('')),
            create_time: Date.now(),
            content: '对方还不是你的好友',
            msgType: msgType.notFriend
        }).save()

        const { clients } = wss
        clients.forEach(ws => {
            const msg = JSON.stringify({
                msgType: data.msgType,
                data: result
            })
            // 给接收方发送一条消息
            if (ws.user_id == data.from) {
                ws.send(JSON.stringify({
                    msgType: msgType.notFriend,
                    data: systemMsg
                }))
                ws.send(msg)
            }
        })
    }
}