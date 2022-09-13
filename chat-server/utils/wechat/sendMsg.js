const url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='
const axios = require('axios')
const moment = require('moment')
const fetchAccessToken = require('./accessToken')
const { 
    getWeather, 
    getZaoAn, 
    getGuLi, 
    getTuWei, 
    getDiffTime, 
    getDiffBirthDay, 
    getCaihongpi, 
    getJoke 
} = require('../index')

/**
 * 早安
 * @param {Object} options 
 */

exports.sendGoodMorning = async (options) => {
    const access_token = await fetchAccessToken()
    const week = ['日', '一', '二', '三', '四', '五', '六']
    const weather = await getWeather()
    const weatherInfo = weather.forecasts[0].casts[0]
    const lucky = await getZaoAn()
    axios.post(url+access_token.access_token, {
        touser: options.touser,
        template_id: 'ea58L5kxtek4utQmaE6OF7uDWMYip3XszRD8v5lS_Aw',
        topcolor: '#FF0000',
        data: {
            dayStr: {
                value: moment().format('YYYY-MM-DD hh:mm:ss') + ', ' + '星期' + week[moment().weekday()],
                color: '#173177'
            },
            daytemp: {
                value: weatherInfo.daytemp,
                color: '#173177'
            },
            nighttemp: {
                value: weatherInfo.nighttemp,
                color: '#173177'
            },
            dayweather: {
                value: weatherInfo.dayweather,
                color: '#173177'
            },
            nightweather: {
                value: weatherInfo.nightweather,
                color: '#173177'
            },
            lucky: {
                value: lucky,
                color: '#173177'
            }
        }
    })
    .then(res => {
        // console.log(res)
    })
    .catch(err => {
        // console.log(err)
    })
}

/**
 * 吃午饭
 * @param {*} options 
 */
exports.sendEatLanchMsg = async (options) => {
    const access_token = await fetchAccessToken()
    const week = ['日', '一', '二', '三', '四', '五', '六']
    const lucky = await getGuLi()
    axios.post(url+access_token.access_token, {
        touser: options.touser,
        template_id: 'HqDTLmRf_3jczRIUIZsUefiJv_NO2qWRnUKgmm6D3xI',
        topcolor: '#FF0000',
        data: {
            timeStr: {
                value: moment().format('YYYY-MM-DD hh:mm:ss') + ', ' + '星期' + week[moment().weekday()],
                color: '#173177'
            },
            saying: {
                value: lucky.saying,
                color: '#173177'
            },
            transl: {
                value: lucky.transl,
                color: '#173177'
            },
            source: {
                value: '--' + lucky.source,
                color: '#173177'
            }
        }
    })
    .then(res => {
        // console.log(res)
    })
    .catch(err => {
        // console.log(err)
    })
}

/**
 * 多喝水
 */

exports.sendWaterMsg = async (options) => {
    const access_token = await fetchAccessToken()
    const week = ['日', '一', '二', '三', '四', '五', '六']
    const lucky = await getGuLi()
    axios.post(url+access_token.access_token, {
        touser: options.touser,
        template_id: 'mXay_OPq-0nQ7oTwTeVc4iS6ZxU3XUuasGwjvdZR5YA',
        topcolor: '#FF0000',
        data: {
            timeStr: {
                value: moment().format('YYYY-MM-DD hh:mm:ss') + ', ' + '星期' + week[moment().weekday()],
                color: '#173177'
            },
            saying: {
                value: lucky.saying,
                color: '#173177'
            },
            transl: {
                value: lucky.transl,
                color: '#173177'
            },
            source: {
                value: '--' + lucky.source,
                color: '#173177'
            }
        }
    })
    .then(res => {
        // console.log(res)
    })
    .catch(err => {
        // console.log(err)
    })
}
/**
 * 睡觉
*/

exports.sendSleepMsg = async (options, romete = true) => {
    const access_token = await fetchAccessToken()
    const week = ['日', '一', '二', '三', '四', '五', '六']
    let lucky = {}
    if (romete == true) {
        lucky = await getGuLi()
    } else {
        lucky = {
            saying: '让我看看是谁还不睡觉',
            transl: '原来是王瑜还没睡啊',
            source: '不睡的人是小狗，汪汪汪~'
        }
    }
    
    axios.post(url+access_token.access_token, {
        touser: options.touser,
        template_id: 'e0lkUKU3wGBwMhpieRy3sXn91ba6cFDQF4wFSJaXw5o',
        topcolor: '#FF0000',
        data: {
            timeStr: {
                value: moment().format('YYYY-MM-DD hh:mm:ss') + ', ' + '星期' + week[moment().weekday()],
                color: '#173177'
            },
            saying: {
                value: lucky.saying,
                color: '#173177'
            },
            transl: {
                value: lucky.transl,
                color: '#173177'
            },
            source: {
                value: '--' + lucky.source,
                color: '#173177'
            }
        }
    })
    .then(res => {
        // console.log(res)
    })
    .catch(err => {
        // console.log(err)
    })
}
/**
 * 晚饭
 * */ 

 exports.sendDinnerMsg = async (options) => {
    const access_token = await fetchAccessToken()
    const week = ['日', '一', '二', '三', '四', '五', '六']
    const lucky = await getGuLi()
    axios.post(url+access_token.access_token, {
        touser: options.touser,
        template_id: 'ZPDLwa4jrZsh2g6ouqR-1DF7ik6wbHamUO1PZkyo6aI',
        topcolor: '#FF0000',
        data: {
            timeStr: {
                value: moment().format('YYYY-MM-DD hh:mm:ss') + ', ' + '星期' + week[moment().weekday()],
                color: '#173177'
            },
            saying: {
                value: lucky.saying,
                color: '#173177'
            },
            transl: {
                value: lucky.transl,
                color: '#173177'
            },
            source: {
                value: '--' + lucky.source,
                color: '#173177'
            }
        }
    })
    .then(res => {
        // console.log(res)
    })
    .catch(err => {
        // console.log(err)
    })
}
/**
 * 我爱你
 */

exports.sendLoveMsg = async (options) => {
    const access_token = await fetchAccessToken()
    const week = ['日', '一', '二', '三', '四', '五', '六']
    /**
     * 遇见天数
     */
    const meetDays = getDiffTime('2022-04-14 00:00:00')
    // 在一起天数
    const togetherDays = getDiffTime('2022-07-04 00:00:00')
    // 生日倒计时
    const birthDays = getDiffBirthDay()

    axios.post(url+access_token.access_token, {
        touser: options.touser,
        template_id: '6x1ALON5iBqu5OHdcmYZtJsCyjANmK7-6_ttDKKUOKM',
        topcolor: '#FF0000',
        data: {
            timeStr: {
                value: moment().format('YYYY-MM-DD hh:mm:ss') + ', ' + '星期' + week[moment().weekday()],
                color: '#173177'
            },
            meetDays: {
                value: meetDays,
                color: '#173177'
            },
            togetherDays: {
                value: togetherDays,
                color: '#173177'
            },
            birthDays: {
                value: birthDays,
                color: '#173177'
            }
        }
    })
    .then(res => {
        // console.log(res)
    })
    .catch(err => {
        // console.log(err)
    })
}

/** 
 * 每日情话
 */

exports.sendTuWei = async (options) => {
    const access_token = await fetchAccessToken()
    const tuweiText = await getTuWei()
    const week = ['日', '一', '二', '三', '四', '五', '六']
    axios.post(url+access_token.access_token, {
        touser: options.touser,
        template_id: 'S2B47toWaGoJJyppcpZhq379rm77IYrf-UMYU3snbrs',
        topcolor: '#FF0000',
        data: {
            timeStr: {
                value: moment().format('YYYY-MM-DD hh:mm:ss') + ', ' + '星期' + week[moment().weekday()],
                color: '#173177'
            },
            tuweiText: {
                value: tuweiText,
                color: '#173177'
            }
        }
    })
    .then(res => {
        // console.log(res)
        console.log('土味情话成功')
    })
    .catch(err => {
        console.log('土味情话失败')
        // console.log(err)
    })
}

/**
 * 彩虹屁
 */
exports.sendCaiHongPi = async (options) => {
    const access_token = await fetchAccessToken()
    const text = await getCaihongpi()
    axios.post(url+access_token.access_token, {
        touser: options.touser,
        template_id: 'qcG3EQ8JNwAEyMCd8AvAw1bag7Iko6s4S-Wh37jXg4U',
        topcolor: '#FF0000',
        data: {
            text: {
                value: text.replace('XXX', '王瑜'),
                color: '#173177'
            }
        }
    })
    .then(res => {
        // console.log(res)
        console.log('彩虹屁成功')
    })
    .catch(err => {
        console.log('彩虹屁成功')
        // console.log(err)
    })
}

/**
 * 笑话
 */

exports.sendJoke = async (options) => {
    const access_token = await fetchAccessToken()
    const jokeData = await getJoke()
    axios.post(url+access_token.access_token, {
        touser: options.touser,
        template_id: 'hxDj0j099QRkksL2liJS5PECN4o0t9U_vIj1pdP1Zuk',
        topcolor: '#FF0000',
        data: {
            title: {
                value: jokeData.title,
                color: '#173177'
            },
            content: {
                value: jokeData.content,
                color: '#173177'
            }
        }
    })
    .then(res => {
        // console.log(res)
        console.log('笑话成功')
    })
    .catch(err => {
        console.log('笑话失败')
        // console.log(err)
    })
}