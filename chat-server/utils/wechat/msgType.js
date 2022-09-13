
exports.MsgType = {
    event: 'event',
    text: 'text',
    image: 'image',
    voice: 'voice',
    video: 'video'
}

exports.EventType = {
    subscribe: 'subscribe', // 关注
    unsubscribe: 'unsubscribe', // 取消关注
    SCAN: 'SCAN', // 扫码
    LOCATION: 'LOCATION', // 位置
    CLICK: 'CLICK', // 点击自定义菜单
    VIEW: 'VIEW' // 点击菜单链接跳转事件
}