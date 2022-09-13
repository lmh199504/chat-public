
module.exports = async (options) => {
    const replyMsg = '这个视频不错，挺好看的，等会叫我粑粑一起看'
    const str = `<xml>
        <ToUserName><![CDATA[${options.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${options.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${replyMsg}]]></Content>
    </xml>`
    return str
}