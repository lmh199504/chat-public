
const DynamicModel = require('../../models/dynamic')

module.exports = async (ctx) => {
    const { user_id, size = 10, page = 1 } = ctx.request.body
    // const { size = 10, page = 1 } = ctx.request.query
    // 1表示使用升序排列，-1表示降序排序
    const list = await DynamicModel.aggregate([
        { '$match': {
            user_id: user_id,
            is_del: false
        }},
        {'$lookup': {
            'from': 'users', // 关联的集合
            // 'localField': 'user_id', // 本地关联的字段
            // 'foreignField': 'id', // 对方集合关联的字段
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
        }}
    ]).sort({ 'create_time': -1 }).skip((page - 1) * size).limit(parseInt(size))
    const total = await DynamicModel.countDocuments({ user_id: user_id, is_del: false })
    ctx.body = {
        code: ctx.base_code.SUCCESS,
        data: {
            rows: list,
            total: total
        },
        msg: '获取成功'
    }
}