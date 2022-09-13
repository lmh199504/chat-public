
const { getTuLinMsg } = require('../index')

module.exports = async (data) => {
    const replyMsg = await getTuLinMsg(data.Recognition)
    const str = `<xml>
        <ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${replyMsg}]]></Content>
    </xml>`
    return str
}