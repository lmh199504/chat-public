/**
 * 获取消息
 */
const md5 = require('blueimp-md5')
const MesageModel = require('../../models/conversation/message')
module.exports = async (ctx) => {
    const { user_id } = ctx.request.user_id

    const { friend_id, page = 1, size = 5, } = ctx.request.body
    const conversation_id = md5([user_id, friend_id].sort().join(''))
    const data = await MesageModel.aggregate([
        {
            $match: {
                $expr: { $eq: [conversation_id, "$conversation_id"] },
                $and: [ // 对方发送
                    { $expr: { $eq: [friend_id, "$to"] } },
                    { is_fail: false },
                ]
            }
        },
        {
            $sort: { create_time: -1 }
        },
        {
            $skip: (page - 1) * size
        },
        {
            $limit: size
        }
        
    ])
    const count = await MesageModel.countDocuments({
        conversation_id: conversation_id,
        $and: [ // 对方发送
            { $expr: { $eq: [friend_id, "$to"] } },
            { is_fail: false },
        ]
    })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: {
            rows: data,
            total: count
        },
        msg: 'success'
    }
}


