
const Jwt = require('../token/index.js')
const jwt = new Jwt()
const BASE_CODE = require('../utils/baseCode')
const UserModel = require('../models/user')
const whiteRoute = [
    '/user/login',
    '/user/register',
    '/user/sendCode',
    '/'
]
const regexp = /^(\/\?)\w*/

module.exports = async (ctx,next) => {
    const url = ctx.request.url
    if(whiteRoute.includes(url) || url.startsWith('/weibo') || url.startsWith('/extension') || regexp.test(url)) {
        await next()
    } else {
        let token = ctx.request.headers["authorization"]
        const request = jwt.verifyToken(token)
        if(request == 'err') {
            ctx.status = 200;
            ctx.body = {
                code: BASE_CODE.TOKEN_OUT,
                msg: 'token已过期请重新登录。'
            }
        } else {
			ctx.request.user_id = request
            const { user_id } = request
            const userData = await UserModel.findOne({ id: user_id })
            if (!userData) {
                ctx.body = {
                    code: BASE_CODE.TOKEN_OUT,
                    msg: 'token已过期请重新登录。'
                }
            } else {
                await next();
            }
        }
    }
}