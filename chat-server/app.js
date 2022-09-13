const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body');
const BodyParser = require('koa-bodyparser');
const router = require('./router')
const chalk = require('chalk')
const userCode = require('./middleware/useCode')
const checkToken = require('./middleware/checkToken')
const parseXml = require('./middleware/parseXml')
const cors = require('koa2-cors');
// 连接数据库
require('./db')
// 跨域
app.use(cors());
// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ` + chalk.green(`${rt}`));
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(parseXml)

app.use(
    koaBody({
        text: false, // 是否解析 text/plain 的表单
        multipart: true,    //解析多个文件
        formidable: {
            maxFileSize: 100 * 1024 * 1024,    // 设置上传文件大小最大限制，默认2M
            //uploadDir: 可以填写一个路径，不填写默认为 os.tmpDir()
        }
    })
)
// /*利用koa-bodyparser来处理POST*/
app.use(BodyParser())
/*注入code状态码*/
app.use(userCode)
/*验证token*/
app.use(checkToken)

app.use(router.routes())

module.exports = app