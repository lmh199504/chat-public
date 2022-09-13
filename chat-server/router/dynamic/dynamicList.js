/**
 * 朋友圈动态列表
 */
const DynamicModel = require('../../models/dynamic')
const FriendModel = require('../../models/friend/friend')
module.exports = async (ctx) => {
    const { user_id } = ctx.request.user_id
    const { size = 10, page = 1 } = ctx.request.query
    // 好友列表
    const friendList = await FriendModel.find({ user_id: user_id, is_single: false })
    // 1表示使用升序排列，-1表示降序排序
    const list = await DynamicModel.aggregate([
        {
            '$match': {
                $expr: { $eq: ["$is_del", false] },
                $or: [
                    { user_id: user_id }, // 自己的动态
                    {
                        user_id: { $in: friendList.map(item => item.friend_id) }  // 好友的动态
                    }
                ]
            }
        },
        {
            '$lookup': {
                'from': 'users', // 关联的集合
                'let': { user_id: '$user_id' },
                'pipeline': [
                    {
                        '$match': {
                            $expr: { $eq: ["$$user_id", "$id"] }
                        }
                    },
                    {
                        '$project': { password: 0 } // 去掉password
                    }
                ],
                'as': 'user' // 结果字段名
            }
        },
        {
            '$lookup': {
                from: 'comments',
                // localField: 'dynamic_id',
                // foreignField: 'dynamic_id',
                let: { dynamic_id: '$dynamic_id' }, // DynamicModel 的 dynamic_id
                pipeline: [
                    {
                        // 应该循环匹配
                        $match: {
                            $expr:{ $eq: ['$$dynamic_id', '$dynamic_id'] },
                            $or: [
                                {
                                    to: user_id  // 发给我的
                                },
                                {
                                    from: user_id // 我发出的
                                },
                                // 互相为好友的
                                {
                                    $and: [
                                        {
                                            from: { $in: friendList.map(item => item.friend_id) },  // 在好友列表里的
                                        },
                                        {
                                            to: { $in: friendList.map(item => item.friend_id) }
                                        }
                                    ]
                                    
                                }
                            ]
                        },
                    },
                    // 发送者
                    {
                        $lookup: {
                            from: 'users',
                            let: { from: '$from' }, // comments 中的 from
                            pipeline: [{
                                $match: {
                                    $expr:{ $eq: ['$$from', '$id'] }
                                },
                            }],
                            as: 'from'
                        }
                    },
                    // 接收者
                    {
                        $lookup: {
                            from: 'users',
                            let: { to: '$to' }, // comments 中的 to 去匹配 users 中的 id
                            pipeline: [{
                                $match: {
                                    $expr:{ $eq: ['$$to', '$id'] }
                                },
                            }],
                            as: 'to'
                        }
                    },
                    {
                        $addFields: {
                            from_info: { $arrayElemAt: ["$from", 0] } 
                        }
                    },
                    {
                        $addFields: {
                            to_info: { $arrayElemAt: ["$to", 0] } 
                        }
                    },
                    {
                        $project: {
                            'from_info.password': 0,
                            'to_info.password': 0,
                            'from': 0,
                            'to': 0
                        }
                    }
                ],
                as: 'comment'
            }
        },
        {
            '$lookup': {
                from: 'dynamiclikes',
                let: { dynamic_id: '$dynamic_id' }, // DynamicModel 的 dynamic_id
                pipeline: [
                    {
                        // 应该循环匹配
                        $match: {
                            $expr:{ $eq: ['$$dynamic_id', '$dynamic_id'] }
                        },
                        
                    },
                    // 发送者
                    {
                        $lookup: {
                            from: 'users',
                            let: { user_id: '$user_id' }, // comments 中的 from
                            pipeline: [{
                                $match: {
                                    $expr:{ $eq: ['$$user_id', '$id'] }
                                },
                            }],
                            as: 'likeUser'
                        }
                    },
                    {
                        $replaceRoot: { newRoot: { $mergeObjects: ["$ROOT", { $arrayElemAt: ["$likeUser", 0] }] } }
                    },
                ],
                as: 'likeList'
            }
        }
    ]).sort({ 'create_time': -1 }).skip((page - 1) * size).limit(parseInt(size))
    const total = await DynamicModel.countDocuments({
        is_del: false,
        $or: [
            { user_id: user_id }, // 自己的动态
            {
                user_id: { $in: friendList.map(item => item.friend_id) }  // 好友的动态
            }
        ]
    })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: {
            rows: list,
            total: total
        },
        msg: '获取成功'
    }
}