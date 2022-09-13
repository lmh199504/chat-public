/*
{
    ToUserName: 'gh_8c4b8b9b1767',
    FromUserName: 'olgwHwOaFwtpDVPmuRcje71h4CR4',
    CreateTime: '1661053279',
    MsgType: 'text',
    Content: '乐山大佛',
    MsgId: '23780566266776059'
}

*/
const { getTuLinMsg } = require('../index')

module.exports = async (data) => {
    let replyMsg = ''
    if (data.Content.indexOf('林茂华')>-1) {
        replyMsg = '林茂华是大傻子，他是我粑粑'
    } else if (data.Content.indexOf('王瑜')>-1) {
        replyMsg = '王瑜你真棒，王瑜是全世界最好的，她是我麻麻'
    } else if (data.Content.indexOf('妈妈')>-1) {
        replyMsg = '我麻麻是王瑜'
    } else {
        replyMsg = await getTuLinMsg(data.Content)
    }
    
    const str = `<xml>
        <ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${replyMsg}]]></Content>
    </xml>`
    return str
}
