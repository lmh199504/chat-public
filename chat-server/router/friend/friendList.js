/**
 * 好友列表
 */
const FriendModel = require('../../models/friend/friend')
module.exports = async (ctx) => {
    const { user_id } = ctx.request.user_id
    const data = await FriendModel.aggregate([
        { '$match': { user_id: user_id } },
        {
            '$lookup': {
                'from': 'users', // 关联的集合
                'let': { friend_id: '$friend_id' }, // FriendModel 中 friend_id 字段
                'pipeline': [
                    {
                        '$match': {
                            $expr: { $eq: ["$$friend_id", "$id"] } // FriendModel 中 friend_id 字段 匹配 UserModel 中 id 字段
                        }
                    },
                    {
                        '$project': { password: 0 } // 去掉password
                    }
                ],
                'as': 'users' // 结果字段名
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: ["$$ROOT", { $arrayElemAt: ["$users", 0] }] } }
        },
        {
            $project: {users: 0, user_id: 0}
        }
    ])

    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: data,
        msg: 'success'
    }
}    