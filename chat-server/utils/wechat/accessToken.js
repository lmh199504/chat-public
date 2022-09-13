
const { readFile, writeFile } = require('fs')
const path = require('path')
const axios = require('axios')
const { WeChat } = require('../../config')
/**
 * 获取access_token
 * 有效期 7200s
 * 上限2000次
*/

/**
 * 验证 access_token 是否有效
 * @param {Object} accessToken 
 * @return {boolean}
*/
function isValideAccessToken(accessToken) {
    // console.log(accessToken)
    if (!accessToken || !accessToken.expires_in || !accessToken.access_token) {
        return false
    }
    return accessToken.expires_in > Date.now()
}

/**
 * 发送请求获取 accessToekn
 * 请求返回值 {"access_token":"ACCESS_TOKEN","expires_in":7200}
*/

function getAccessToken() {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WeChat.AppID}&secret=${WeChat.AppSecret}`
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res => {
                const data = res.data
                data.expires_in = Date.now() + (data.expires_in - 300) * 1000
                console.log('请求成功')
                resolve(data)
            })
            .catch(err => {
                reject('获取access_token失败了' + err)
            })
    })
}

/**
 * 保存 access_token
 * @param {Object} accessToekn
 * */
function saveAccessToken(accessToekn) {
    return new Promise((resolve, reject) => {
        writeFile(resolvePath('../../accessToken.txt'), JSON.stringify(accessToekn), err => {
            if (!err) {
                console.log('保存成功')
                resolve()
            } else {
                reject('保存失败' + err)
            }
        })
    })
}
/**
 * 
 * @returns {Promise} accessToekn
 */
function readAccessToken() {
    return new Promise((resolve) => {
        readFile(resolvePath('../../accessToken.txt'), (err, data) => {
            if (!err) {
                resolve(JSON.parse(data))
            } else {
                console.log('读取失败了')
                // 返回一个空字符串
                resolve('')
            }
        })
    })
}
/**
 * 
 * @param {string} path 
 * @returns 
 */
function resolvePath(pathStr) {
    return path.resolve(__dirname, pathStr)
}


async function fetchAccessToken() {
    try {  
        // 先读取本地文件
        const loaclToekn = await readAccessToken()
        if (isValideAccessToken(loaclToekn)) { // 未过期
            return Promise.resolve(loaclToekn)
        } else { // 已过期
            const response = await getAccessToken()
            // 保存
            await saveAccessToken(response)
            return Promise.resolve(response)
        }
    } catch (error) {
        console.log('fetchAccessToken 失败了' + error)
    }
}


module.exports = fetchAccessToken