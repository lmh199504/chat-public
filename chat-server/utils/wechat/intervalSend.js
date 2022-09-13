const { 
    sendGoodMorning, 
    sendEatLanchMsg, 
    sendWaterMsg, 
    sendSleepMsg, 
    sendDinnerMsg, 
    sendLoveMsg, 
    sendTuWei, 
    sendCaiHongPi,
    sendJoke
} = require('./sendMsg')
const {openid} = require('../../config/index')
const moment = require('moment')
module.exports = () => {
    setInterval(() => {
        const h = moment().hour();
        const m = moment().minute();
        const month = moment().month() + 1 // 月
        const date = moment().date() // 日
        // 我爱你
        if (h == 5 && m == 20) {
            sendLoveMsg({ touser: openid.wy })
            sendLoveMsg({ touser: openid.lmh })
        }
        // 七点起床
        if (h == 7 && m == 0) {
            sendGoodMorning({ touser: openid.wy })
            sendGoodMorning({ touser: openid.lmh })
        } 
        // 彩虹屁 
        if (h == 9 && m == 0) {
            sendCaiHongPi({
                touser: openid.wy
            })
            sendCaiHongPi({
                touser: openid.lmh
            })
        }
        // 吃午饭 12点
        if (h == 12 && m == 0) {
            sendEatLanchMsg({ touser: openid.wy })
            sendEatLanchMsg({ touser: openid.lmh })
        }
        // 喝水 15点
        if (h == 15 && m == 0) {
            sendWaterMsg({ touser: openid.wy })
            sendWaterMsg({ touser: openid.lmh })
        }
        // 吃晚饭 18点
        if (h == 18 && m == 0) {
            sendDinnerMsg({ touser: openid.wy })
            sendDinnerMsg({ touser: openid.lmh })
        }
        // 情话
        if (h == 20 && m ==0) {
            sendTuWei({ touser: openid.wy })
            sendTuWei({ touser: openid.lmh })
        }
        // 笑话
        if (h == 22 && m == 0) {
            sendJoke({ touser: openid.wy })
            sendJoke({ touser: openid.lmh })
        }
        // 睡觉
        if (h == 23 && m == 0) {
            sendSleepMsg({ touser: openid.wy })
            sendSleepMsg({ touser: openid.lmh })
        }
        // 睡觉
        if (h == 0 && m == 0) {
            sendSleepMsg({ touser: openid.wy }, false)
            sendSleepMsg({ touser: openid.lmh }, false)
        }
        // 生日 6.22凌晨发送
        if (month == 6 && date == 22 && h == 0 & m ==0) {
            console.log('生日快乐')
        }

    }, 1000 * 60)
}