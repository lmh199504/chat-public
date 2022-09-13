const sha1 = require('sha1')
const { WeChat } = require('../../config')

/**
 * 
 * @param {string} timestamp 
 * @param {string} nonce 
 * @param {string} signature 
 * @returns 
 */
function authSign(timestamp, nonce, signature) {

    /**
     * 计算得出 signature 验证是否与微信请求过来的一直
     * 1.将三个参数 timestamp nonce token 组合在一起 按字典序排序
     * 2.将数组里所有参数拼接成一个字符串，进行sha1加密
     * 3.加密完成就生成了一个 signature，和微信发送过来的进行对比
     *   -如果一样,则消息来自微信服务器 返回 echostr 给微信服务器
     *   -如果不一样，则不是来自微信服务器，返回error
    */
    const { token } = WeChat
    /**
     * 1.拼接数组
    */
    const arr = [timestamp, nonce, token].sort()
    /**
     * 2.进行sha1加密
    */
    const sha1Str = sha1(arr.join(''))
    /**
     * 3.验证与微信发送的是否一致
    */
    return signature === sha1Str
}
module.exports = authSign