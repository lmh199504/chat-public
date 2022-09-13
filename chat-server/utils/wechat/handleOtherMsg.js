module.exports = async (options) => {
    const replyMsg = '这是什么消息我还小看不懂，你跟我粑粑说吧~'
    const str = `<xml>
        <ToUserName><![CDATA[${options.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${options.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${replyMsg}]]></Content>
    </xml>`
    return str
}
