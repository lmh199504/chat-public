const WebSocket = require('ws')
const msgType = require('./msgType')
const Jwt = require('../token')
const jwt = new Jwt()
const UserModel = require('../models/user')
const BaseCode = require('../utils/baseCode')
const { createSystemMsg } = require('./createMsg')
const handleMessage = require('./handleMessage')

const mySocket = (function() {
    let wss = null
    return function getSocket(server) {
        if (wss) {
            return wss
        }
        if (!server) {
            console.warn('warning: need server')
            return 
        }
        wss = new WebSocket.Server({ server, path: '/websockets' })
        wss.on('connection', (ws, request) => {
            console.log('已连接数：' + wss.clients.size)
            // 检查token
            checkToken(request.url, ws)
            ws.on('message', (data) => handleMessage(data, wss))
            ws.on('close', () => {
                console.log('已连接数：' + wss.clients.size)
                console.log('关闭连接')
            })
        })
        return wss
    }
}) ()
// 获取参数
function getQueryString(str, name) {
    const strArr = str.split('?')
    if (strArr.length == 2) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = strArr[1].match(reg)
        if (r != null) return encodeURI(r[2]); return null;
    } else {
        return null
    }    
}
// 检查token
async function checkToken(url, ws) {
    const token = getQueryString(url, 'token')
    if (token) {
        const result = jwt.verifyToken(token)
        if (result == 'err') {
            ws.send(createSystemMsg({
                code: BaseCode.TOKEN_OUT,
                msg: 'token无效',
                msgType: msgType.text
            }))
            ws.close()
        } else {
            ws.user_id = result.user_id
            const data = await UserModel.findOne({ id: result.user_id })
            if (data) {
                ws.send(createSystemMsg({
                    msg: '欢迎登录：' + data.username,
                    code: BaseCode.SUCCESS,
                    msgType: msgType.text
                }))
            } else {
                ws.send(createSystemMsg({
                    code: BaseCode.TOKEN_OUT,
                    msg: 'token无效',
                    msgType: msgType.text
                }))
                ws.close()
            }
        }
    } else {
        ws.send(createSystemMsg({
            msg: '缺少token',
            code: BaseCode.TOKEN_OUT,
            msgType: msgType.text
        }))
        ws.close()
    }
}
module.exports = mySocket