const getSocket = require('../../socket')
const { createSystemMsg } = require('../../socket/createMsg') 
const msgType = require('../../socket/msgType')
const UserModel = require('../../models/user')
const FriendRequestModel = require('../../models/friend/friendrequest')
const { requestFriendStatus } = require('../../utils/enum') 
const md5 = require('blueimp-md5')

module.exports = async (ctx) => {
    /* 请求人 */
    const from_user_id = ctx.request.user_id.user_id
    // 请求人信息
    const userInfo = await UserModel.findOne({ id: from_user_id }, { password: 0 })
    // 被请求人
    const { user_id, msg } = ctx.request.body
    const { clients } = getSocket()
    /**
     * 此处应该检查是否为好友
     */
    const request_id = md5(from_user_id + user_id)
    const find = await FriendRequestModel.findOne({ request_id: request_id })
    if (find) {
        await FriendRequestModel.findOneAndUpdate({ request_id: request_id }, {
            request_id: request_id,
            from: from_user_id,
            to: user_id,
            create_time: Date.now(),
            status: requestFriendStatus.undo,
            is_read: false,
            msg: msg
        })
    } else {
        await new FriendRequestModel({
            request_id: request_id,
            from: from_user_id,
            to: user_id,
            create_time: Date.now(),
            status: requestFriendStatus.undo,
            is_read: false,
            msg: msg
        }, { password: 0, __v: 0 }).save()
    }

    // 给被请求人发送即时消息
    clients.forEach(ws => {
        if (ws.user_id == user_id) {
            const msg = createSystemMsg({
                code: ctx.base_code.SUCCESS,
                msg: userInfo.username + '请求添加好友',
                msgType: msgType.request,
                data: {
                    userInfo: userInfo
                }
            })
            ws.send(msg)
        }
    })
    
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: '请求已发送',
        msg: 'success'
    }
}