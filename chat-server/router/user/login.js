// 用户登录
const Jwt = require('../../token/index')
const md5 = require('blueimp-md5')
const UserModel = require('../../models/user')
module.exports = async (ctx) => {
    const { account, password } = ctx.request.body
    if (!account || !password) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '请输入账号密码'
        }
    }
    const data = await UserModel.findOne({ password: md5(password), account: account })
    if (!data) {
        ctx.body = {
            code: ctx.base_code.ERROR,
            msg: '用户不存在或密码错误'
        }
    } else {
        const jwt = new Jwt()
        const token = jwt.generateToken({ user_id: data.id })
        ctx.body = {
            code: ctx.base_code.SUCCESS,
            data: token,
            msg: '登录成功'
        }
    }
}