export default{
	isLogin: state => state.user.userId ? true : false,
	nickName: state => state.user.nickName,
	background: state => state.user.userInfo.background,
	avatar: state => state.user.userInfo.avatar,
	/* 用户信息 */
	userInfo: state => state.user.userInfo,
	/* 用户ID */
	userId: state => state.user.userId,
	/* 好友请求*/
	unreadCountRequest: state => state.friend.unread,
	/* 好友列表 */
	friendList: state => state.friend.friendList,
	/* 好友数量 */
	friendNum: state => state.friend.friendNum,
	/* 会话列表 */
	conversationList: state => state.message.conversationList,
	/* 当前消息列表 */
	curMessageList: state => {
		const find = state.message.conversationList.find(item => item.conversation_id === state.message.curConversationId)
		if (find) {
			return find.messages.sort((a, b) => a.create_time - b.create_time)
		} else {
			return []
		}
	},
	/* 未读消息条数 */
	allUnReadCount: state => state.message.allUnReadCount,
	curConversation: state => {
		const find = state.message.conversationList.find(item => item.conversation_id === state.message.curConversationId)
		return find
	},
	/* 表情包 */
	emojiList: state => state.emoji.emojiList
}
