const authSign = require('../../utils/wechat/auth')
module.exports = async (ctx) => {
    const { echostr, timestamp, nonce, signature } = ctx.query
    if (authSign(timestamp, nonce, signature)  ) {
        console.log('微信---get')
        console.log('验证成功')
        ctx.body = echostr
    } else {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '未知来源消息'
        }
    }
}