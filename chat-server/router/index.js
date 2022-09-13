const Router = require('koa-router')
const router = new Router()
const user = require('./user')
const wechat = require('./wechat')
const common = require('./common')
const dynamic = require('./dynamic')
const friend = require('./friend')
const message = require('./message')
const emoji = require('./emoji')
const comment = require('./comment')
/**
 * 微信接口
 */
router.get('/', wechat.auth)
router.post('/', wechat.wechatMsg)

/**
 * 用户接口
 */
router.post('/user/register', user.register)
router.get('/user/info', user.userInfo)
router.post('/user/login', user.login)
router.post('/user/dynamic', user.dynamic)
router.get('/user/infoById', user.infoById)
router.post('/user/avatar', user.updateAvatar)
router.post('/user/updateBackground', user.updateBackground)
router.post('/user/updateName', user.updateName)
router.post('/user/updateSign', user.updateSign)
/**
 * 通用接口
 */
router.post('/common/upload', common.upload)

/**
 * 动态接口
 */
router.get('/dynamic/list', dynamic.dynamicList)
router.post('/dynamic/dynamicById', dynamic.dynamicById)
router.post('/dynamic/delDynamic', dynamic.delDynamic)
/**
 * 好友相关
 */
router.get('/friend/search', friend.search)
router.post('/friend/rquest', friend.sendFriendRequest)
router.get('/friend/rquestList', friend.requestList)
router.post('/friend/dealRequest', friend.dealRequest)
router.post('/friend/updateRequest', friend.updateRequest)
router.get('/friend/friendList', friend.friendList)

/**
 * 聊天、会话相关
 */
router.get('/conversation/list', message.getConversation)
router.post('/conversation/readMsg', message.readMsg)
router.post('/conversation/getMessage', message.getMessage)

/**
 * 表情包相关
 */
router.get('/emoji/list', emoji.getEmoji)
router.post('/emoji/create', emoji.createEmoji)
router.post('/emoji/delEmoji', emoji.delEmoji)
router.post('/emoji/topEmoji', emoji.topEmoji)
/**
 * 评论相关
 */
router.post('/commnet/sendComment', comment.sendComment)
router.get('/comment/getComment', comment.getComment)
router.post('/dynamic/like', comment.likeDynamic)

module.exports = router