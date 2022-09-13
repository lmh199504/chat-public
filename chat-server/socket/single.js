// 闭包单例模式
const mySocket = (function() {
    let instance = null
    return function getSocket(server) {
        if (instance) {
            console.log('已有实例')
            return instance
        }
        
        console.log('没有')
        instance = 6666
    }
}) ()

module.exports = mySocket