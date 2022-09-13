/**
 * 获取用户信息
 */
const UserModel = require('../../models/user')
const FriendModel = require('../../models/friend/friend')
module.exports = async (ctx) => {
    const { id } = ctx.request.query
    const { user_id } = ctx.request.user_id
    const result = await UserModel.findOne({ id: id }, { password: 0 })
    // 是否好友
    const data = await FriendModel.findOne({ user_id: user_id, friend_id: id })
    if (result) {
        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: {
                ...JSON.parse(JSON.stringify(result)),
                isFriend: data ? true : false
            },
            msg: 'success'
        }
    } else {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '用户不存在'
        }
    }
}