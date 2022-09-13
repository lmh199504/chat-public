
const AipOcrClient = require("baidu-aip-sdk").ocr;
const { Biadu } = require('../../config')
const client = new AipOcrClient(Biadu.APP_ID, Biadu.API_KEY, Biadu.SECRET_KEY);

module.exports = async (options) => {
    const replyMsg = await getImageText(options.PicUrl)
    return `
        <xml>
            <ToUserName><![CDATA[${options.FromUserName}]]></ToUserName>
            <FromUserName><![CDATA[${options.ToUserName}]]></FromUserName>
            <CreateTime>${Date.now()}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[${replyMsg}]]></Content>
        </xml>
    `
}


function getImageText (url) {
    return new Promise((resolve) => {
        // 调用通用文字识别, 图片参数为远程url图片
        client.generalBasicUrl(url).then(function(result) {
            let str = ''
            result.words_result.forEach(item => {
                str = str + item.words + '\n'
            })
            console.log(result.words_result)
            resolve(str)
        }).catch(function(err) {
            // 如果发生网络错误
            console.log(err);
            resolve('哎呀，怎么什么都没有识别到~\n快去联系我粑粑')
        });
    })
}