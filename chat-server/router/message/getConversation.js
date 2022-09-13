/**
 * 获取会话列表
 */
const ConversationModel = require('../../models/conversation/conversation')
module.exports = async (ctx) => {
    const { user_id } = ctx.request.user_id

    const list = await ConversationModel.aggregate([
        {
            $match: { user_id: user_id, is_del: false }
        },
        {
            $sort: { update_time: -1 }
        },
        // 用户信息好友信息
        {
            '$lookup': {
                'from': 'users',
                let: { friend_id: '$friend_id' },
                pipeline: [
                    {
                        '$match': {
                            $expr: { $eq: ["$$friend_id", "$id"] } // FriendModel 中 friend_id 字段 匹配 UserModel 中 id 字段
                        }
                    },
                    {
                        '$project': { password: 0 } // 去掉password
                    }
                ],
                as: 'users'
            }
        },
        {
            $addFields: {
                user_info: { $arrayElemAt: ["$users", 0] } 
            }
        },
        {
            '$lookup': {
                'from': 'friends',
                'let': { friend_id: '$friend_id' },
                pipeline: [
                    { 
                        $match: {
                            $and: [
                               { user_id: user_id },
                               { $expr: { $eq: ["$$friend_id", "$friend_id"] } }
                            ]
                        } 
                    }
                ],
                as: 'friends'
            }
        },
        // 好友备注信息
        {
            $addFields: {
                friend_info: { $arrayElemAt: ["$friends", 0] } 
            }
        },
        // 最新的一条消息
        { 
            '$lookup': {
                'from': 'messages',
                'let': { conversation_id: '$conversation_id', to: '$to', from: '$from' }, // to是对方user_id from 是发送方
                'pipeline': [
                    {
                        $match: {
                            $expr: { $eq: ["$$conversation_id", "$conversation_id"] },
                            // $expr: { $eq: ['$$from', user_id] }, // 我发送
                            $and: [ // 对方发送
                                { $expr: { $eq: ["$$to", "$friend_id"] } },
                                { is_fail: false },
                            ]
                        }
                    },
                    {
                        $sort: { create_time: -1 } 
                    },
                    {
                        $limit: 5
                    }
                ],
                as: 'messages'
            }
        },
        {
            $addFields: {
                message: { $arrayElemAt: ["$messages", 0] }
            }
        },
        // 未读消息
        {
            '$lookup': {
                'from': 'messages',
                'let': { conversation_id: '$conversation_id' },
                'pipeline': [
                    {
                        $match: {
                            $and: [
                                // 会话id匹配
                                {
                                    $expr: { $eq: ["$$conversation_id", "$conversation_id"] } 
                                },
                                // 未读标志 未失败
                                { is_read: false, is_fail: false },
                                // 发送给我的消息
                                { to: user_id }
                            ]
                        }
                    },
                    {
                        $sort: { create_time: -1 } 
                    },
                    {
                        $count: 'count'
                    }
                ],
                as: 'unread'
            }
        },
        {
            $addFields: {
                unreadCount: { $arrayElemAt: ["$unread.count", 0] }
            }
        },
        { 
            $project: { 
                friends: 0, 
                users: 0,
                unread: 0
            } 
        }
    ])
    const total = await ConversationModel.countDocuments({ user_id: user_id, is_del: false })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: {
            rows: list,
            total: total
        },
        msg: 'success'
    }
}