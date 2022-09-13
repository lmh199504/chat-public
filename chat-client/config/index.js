
/* 正式 */
const prodURL = 'xxxxx'
const prodWebsocketUrl = 'xxxxx'

/* 开发 */
const devURL = 'http://localhost:9666'
const devWebsocketUrl = 'ws://localhost:9666/websockets'

export const baseURL = process.env.NODE_ENV == 'development' ? devURL : prodURL
export const websocketUrl = process.env.NODE_ENV == 'development' ? devWebsocketUrl : prodWebsocketUrl