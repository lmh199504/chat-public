
const CommentModel = require('../../models/commnet')
const FriendModel = require('../../models/friend/friend')
module.exports = async (ctx) => {
    const { dynamic_id } = ctx.request.query
    const { user_id } = ctx.request.user_id
    // 好友列表
    const friendList = await FriendModel.find({ user_id: user_id, is_single: false })
    const list = await CommentModel.aggregate([
        { 
            $match: {
                $expr:{ $eq: ['$dynamic_id', dynamic_id] },
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
            }
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
    ]).sort({ 'create_time': 1 })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: list,
        msg: 'success'
    }
}