/**
 * 处理websocket 收到的消息
 */
/**
 * data 接收的数据
 * wss websocket 示例对象 new WebSocket.Server
 */
const msgType = require('./msgType')
const handleTextMsg = require('./handleTextMsg')
module.exports = async (data, wss) => {
    const strData = data.toString()
    try {
        const jsonData = JSON.parse(strData)
        // 文字消息
        if (jsonData.msgType == msgType.text) {
            handleTextMsg(jsonData, wss)
            return
        }
        // 图片消息
        if (jsonData.msgType == msgType.image) {
            handleTextMsg(jsonData, wss)
            return
        }
        // 图片视频
        if (jsonData.msgType == msgType.video) {
            handleTextMsg(jsonData, wss)
            return
        }
        // 语音消息
        if (jsonData.msgType == msgType.sound) {
            handleTextMsg(jsonData, wss)
            return
        }
    } catch (error) {
        console.log('消息格式不正确，不予处理')
    }
}