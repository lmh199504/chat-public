/**
 * 更新好友请求已读状体
 */
const FriendRequestModel = require('../../models/friend/friendrequest')
module.exports = async (ctx) => {
    const { user_id } = ctx.request.user_id
    await FriendRequestModel.updateMany({ to: user_id }, { is_read: true })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: '更新成功',
        msg: 'success'
    }
}