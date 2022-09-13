
const { MsgType, EventType } = require('./msgType')
const createTextMsg = require('./createTextMsg')
const handleImageMsg = require('./handleImageMsg')
const handleVoiceMsg = require('./handleVioceMsg')
const handleVideoMsg = require('./handleVideoMsg')
const handleSubscribe = require('./handleSubscribe')
const handleOtherMsg = require('./handleOtherMsg')
module.exports = async (options) => {
    if (options.MsgType === MsgType.text) { // 文字消息
        return createTextMsg(options)
    } else if (options.MsgType === MsgType.image){ // 图片消息
        return handleImageMsg(options)
    } else if (options.MsgType === MsgType.voice) { // 语音消息
        return handleVoiceMsg(options)
    } else if (options.MsgType === MsgType.video) { // 视频消息
        return handleVideoMsg(options)
    } else if (options.MsgType === MsgType.event) { // 事件
        if (options.Event === EventType.unsubscribe) {
            console.log('用户取消关注了')
            return ''
        } else if (options.Event === EventType.subscribe) { // 关注
            return handleSubscribe(options)
        } else {
            return handleOtherMsg(options)
        }
    } else {
        return handleOtherMsg(options)
    }
}
