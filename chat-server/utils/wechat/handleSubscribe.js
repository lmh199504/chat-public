
module.exports = async (options) => {
    const replyMsg = '感谢您的关注，我这就告诉粑粑去~'
    const str = `<xml>
        <ToUserName><![CDATA[${options.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${options.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${replyMsg}]]></Content>
    </xml>`
    return str
}
