const BASE_CODE = require('../utils/baseCode')
module.exports = async (ctx, next) => {
    ctx.base_code = BASE_CODE
    await next()
}