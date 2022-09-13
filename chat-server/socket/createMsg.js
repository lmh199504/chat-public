const msgType = require('./msgType')
const UUID = require('uuid')
const md5 = require('blueimp-md5')
const MessageModel = require('../models/conversation/message')

// 生成系统消息
exports.createSystemMsg = function createSystemMsg(data) {
    const msgData = {
        msgType: msgType.system,
        msg: data
    }
    return JSON.stringify(msgData)
}

// 生成文字消息
exports.createTextMsg = async function createTextMsg(data, wss) {
    const result = await new MessageModel({
        from: data.from,
        to: data.to,
        msg_id: UUID.v1(),
        conversation_id: md5([data.from, data.to].sort().join('')),
        create_time: Date.now(),
        content: data.content,
        msgType: data.msgType
    }).save()
    const { clients } = wss
    clients.forEach(ws => {
        const msg = JSON.stringify({
            msgType: data.msgType,
            data: result
        })
        // 给接收方发送一条消息
        if (ws.user_id == data.from) {
            ws.send(msg)
        }
        // 给发送方发一条消息
        if (ws.user_id == data.to) {
            ws.send(msg)
        }
    })
}
