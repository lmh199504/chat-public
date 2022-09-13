/**
 * 获取好友请求列表
 */
const FriendRequestModel = require('../../models/friend/friendrequest')
module.exports = async (ctx) => {
    const { page = 1, size = 10 } = ctx.request.query
    const { user_id } = ctx.request.user_id
    const list = await FriendRequestModel.aggregate([
        {
            '$match': {
                $or: [
                    { to: user_id }, { from: user_id }
                ]
            }
        },
        {
            '$lookup': {
                'from': 'users', // 关联的集合
                'let': { from: '$from' }, // FriendRequestModel 中 from 字段
                'pipeline': [
                    {
                        '$match': {
                            $expr: { $eq: ["$$from", "$id"] } // FriendRequestModel 中 from 字段 匹配 UserModel 中 id 字段
                        }
                    },
                    {
                        '$project': { password: 0 } // 去掉password
                    }
                ],
                'as': 'fromuser' // 结果字段名
            }
        },
        {
            '$lookup': {
                'from': 'users', // 关联的集合
                'let': { to: '$to' }, // FriendRequestModel 中 from 字段
                'pipeline': [
                    {
                        '$match': {
                            $expr: { $eq: ["$$to", "$id"] } // FriendRequestModel 中 from 字段 匹配 UserModel 中 id 字段
                        }
                    },
                    {
                        '$project': { password: 0 } // 去掉password
                    }
                ],
                'as': 'touser' // 结果字段名
            }
        },
        {
            $addFields: {
                form_user: { $arrayElemAt: ["$fromuser", 0] } 
            }
        },
        {
            $addFields: {
                to_user: { $arrayElemAt: ["$touser", 0] } 
            }
        },
        { $project: { fromuser: 0, touser: 0 } }
    ]).sort({ create_time: -1 }).skip((page - 1) * size).limit(parseInt(size))
    const total = await FriendRequestModel.countDocuments({
        '$match': {
            $or: [
                { to: user_id }, { from: user_id }
            ]
        }
    })
    const unread = await FriendRequestModel.countDocuments({ to: user_id, is_read: false })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: {
            rows: list,
            total: total,
            unread: unread
        },
        msg: 'success'
    }
}