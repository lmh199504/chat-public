const xml2js = require('xml2js')
const axios = require('axios')
const { TIAN_XING_KEY } = require('../config')
function parseXML(xml) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, { trim: true, explicitArray: false, ignoreAttrs: true }, function (err, result) {
            if (err) {
                return reject(err)
            }
            resolve(result.xml)
        })
    })
}

/**
 * 
 * @param {string} text 
 * @returns {string}
 */
function getTuLinMsg(text) {
    const msg = encodeURIComponent(text)
    return new Promise((resolve, reject) => {
        axios.get(`https://api.qingyunke.com/api.php?key=free&appid=0&msg=${msg}`)
            .then(res => {
                console.log(res.data)
                if (res.data.result === 0) {
                    resolve(res.data.content)
                } else {
                    resolve('哎呀， 出什么幺儿子了，快联系我粑粑。')
                }
            })
            .catch(() => {
                resolve('哎呀， 出什么幺儿子了，快联系我粑粑。')
            })
    })
}

/**
 *  date日期

    week星期几

    dayweather 白天天气现象

    nightweather 晚上天气现象

    daytemp 白天温度

    nighttemp 晚上温度

    daywind 白天风向

    nightwind 晚上风向

    daypower 白天风力

    nightpower 晚上风力
 */
function getWeather() {
    return new Promise((resolve, reject) => {
        axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=29f0a09dce651227fba1ce2f39060e0b&city=370613&extensions=all&output=JSON')
        .then(res => {
            if (res.data.info === 'OK') {
                resolve(res.data)
            } else {
                reject()
            }
        })
        .catch(() => {
            reject()
        })
    })
}



/* 早安 */
function getZaoAn() {
    return new Promise((resolve, reject) => {
        axios.get('http://api.tianapi.com/zaoan/index',{
            params: {key: TIAN_XING_KEY}
        })
        .then(res => {
            // console.log(res.data.newslist[0].content)
            resolve(res.data.newslist[0].content)
        })
        .catch(() => {
            resolve('早安')
        })
    })
}


/* 鼓励 */ 
function getGuLi() {
    return new Promise((resolve, reject) => {
        axios.get('http://api.tianapi.com/lzmy/index',{
            params: {key: TIAN_XING_KEY}
        })
        .then(res => {
            resolve(res.data.newslist[0])
        })
        .catch(() => {
            resolve({
                "saying": "差之毫厘，谬以千里。",
                "transl": "做任何事情，开始一定要认真地做好，如果做差了一丝一毫，结果会发现相差很远。",
                "source": "宋·陆九渊"
            })
        })
    })
}


/**
 * 土味情话
 */

function getTuWei(){
    return new Promise((resolve) => {
        axios.get('http://api.tianapi.com/saylove/index', {
            params: {key: TIAN_XING_KEY}
        })
        .then(res => {
            if (res.data.code == 200) {
                resolve(res.data.newslist[0].content)
            } else {
                resolve('我爱你')
            }
        })
        .catch(() => {
            resolve('我爱你')
        })
    })
}

/**
 * 计算天数
 */

function getDiffTime(startTime, endTime = Date.now()) {
    const start_stamp = new Date(startTime).getTime()
    const end_stamp = new Date(endTime).getTime()
    if (start_stamp > end_stamp) {
        return 0
    } else {
        const time = Math.ceil((end_stamp - start_stamp) / (24 * 60 * 60 * 1000))
        console.log(time)
        return time
    }
}
/**  
 * 生日倒计时
 * */ 
function getDiffBirthDay() {
    const time = new Date()
    time.setMonth(5)
    time.setDate(22)
    time.setHours(0)
    time.setMinutes(0)
    time.setSeconds(0)
    if (Date.now() > time.getTime()) {
        const year = time.getFullYear()
        time.setFullYear(year + 1)
    }
    return getDiffTime(Date.now(), time)
}
/**
 * 雷人笑话
 */

function getJoke() {
    return new Promise((resolve, reject) => {
        axios.get('http://api.tianapi.com/joke/index', {
            params: {
                key: TIAN_XING_KEY,
                num: 1
            }
        })
        .then(res => {
            if (res.data.code == 200) {
                resolve(res.data.newslist[0])
            } else {
                resolve({
                    "title": "精辟的论述",
                    "content": "“爸爸，什么叫‘资本’，什么叫‘劳动’？”“是这样的：如果我从邻居家里借了100卢布，我就有了‘资本’，如果他想从这儿讨回这笔钱，他就必须‘劳动’。”"
                })
            }
        })
        .catch(() => {
            resolve({
                "title": "精辟的论述",
                "content": "“爸爸，什么叫‘资本’，什么叫‘劳动’？”“是这样的：如果我从邻居家里借了100卢布，我就有了‘资本’，如果他想从这儿讨回这笔钱，他就必须‘劳动’。”"
            })
        })
    })
}

/**
 * 彩虹屁
 */

function getCaihongpi() {
    return new Promise((resolve, reject) => {
        axios.get('http://api.tianapi.com/caihongpi/index', {
            params: {key: TIAN_XING_KEY}
        })
        .then(res => {
            if (res.data.code == 200) {
                resolve(res.data.newslist[0].content)
            } else {
                resolve('多谢你如此精彩耀眼，做我平淡岁月里的星辰')
            }
        })
        .catch(() => {
            resolve('多谢你如此精彩耀眼，做我平淡岁月里的星辰')
        })
    })
}

module.exports = {
    getTuWei,
    parseXML,
    getGuLi,
    getZaoAn,
    getWeather,
    getDiffTime,
    getDiffBirthDay,
    getTuLinMsg,
    getJoke,
    getCaihongpi
}
