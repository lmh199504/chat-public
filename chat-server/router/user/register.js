const UUID = require('uuid')
const Jwt = require('../../token/index')
const UserModel = require('../../models/user')
const md5 = require('blueimp-md5')
const { IntOrLet } = require('../../utils/regExp')
const { checkSpecificKey } = require('../../utils/validate')
const { HeaderList } = require('../../utils/enum')
module.exports = async (ctx, next) => {
    const { password, username, account } = ctx.request.body
    if (!password) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '密码不能为空'
        }
    } else if (password.length < 6 || password.length > 20) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '密码长度在6-20位'
        }
    } else if (!username) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '用户名不能为空'
        }
    } else if (username.length > 20) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '用户名长度不能大于20'
        }
    } else if (!checkSpecificKey(account)) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '账号请勿输入特殊字符'
        }
    } else if (!account) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '账号不能为空'
        }
    } else if (!IntOrLet.test(account)) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '账号仅可使用数字、字母'
        }
    } else if(account.length < 6 || account.length > 20) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '账号长度在6-20位'
        }
    } else {
        const IS_EXISTS = await UserModel.exists({ account: account })
        if (IS_EXISTS) {
            ctx.body = {
                code: ctx.base_code.ERROR,
                msg: '账号已被注册'
            }
        } else {  
            const i = Math.ceil(Math.random() * HeaderList.length) - 1
            if (HeaderList.length) {
                imageUrl = HeaderList[i] || 'https://reactlmh.oss-cn-beijing.aliyuncs.com/chatfiles/default.jpg'
            }
            const saveData = await new UserModel({
                account,
                username,
                password: md5(password),
                id: UUID.v1(),
                create_time: Date.now(),
                avatar: imageUrl
            }, { password: 0, __v: 0 }).save()
            const jwt = new Jwt()
            const token = jwt.generateToken({ user_id: saveData.id })
            ctx.body = {
                code: ctx.base_code.SUCCESS,
                data: token,                      
                msg: '注册成功'
            }
        }
    }
}