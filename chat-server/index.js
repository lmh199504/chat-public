const app = require('./app')
const http = require('http')
const server = http.createServer(app.callback());
const PORT = process.env.PORT || 9666
const socket = require('./socket')
const intervalSend = require('./utils/wechat/intervalSend')

socket(server)
// 定时发送微信公众消息
// intervalSend()
server.listen(PORT, () => {
    console.log(`run at: http://localhost:${ PORT }`)
});

module.exports = server