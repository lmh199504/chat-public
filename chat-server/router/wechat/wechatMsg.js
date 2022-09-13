
const authSign = require('../../utils/wechat/auth')
const createMsg = require('../../utils/wechat/createMsg')
module.exports = async (ctx) => {
    /*
        signature: '4db856dc2afd19b1fa20d831e59c054f248bf45f',
        timestamp: '1661008499',
        nonce: '1795602901',
        openid: 'olgwHwOaFwtpDVPmuRcje71h4CR4' // 用户id
    */
    const { openid, timestamp, nonce, signature } = ctx.query
    console.log(ctx.body)
    if (authSign(timestamp, nonce, signature)) {
        const replyMsg = await createMsg(ctx.body)
        ctx.body = replyMsg
    } else {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '未知来源消息'
        }
    }
}