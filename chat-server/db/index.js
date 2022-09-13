const mongoose = require('mongoose')
const chalk = require('chalk')
const { dbUrl } = require('../config')

mongoose.connect(dbUrl,{ useNewUrlParser: true,useUnifiedTopology: true })
const db = mongoose.connection

db.once("open",() => {
    console.log(
        chalk.green('连接数据库成功')
    );
})

db.on('error', (error) => {
    console.error(
        chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', () => {
    console.log(
        chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(dbUrl, {server:{auto_reconnect:true}});
})

module.exports = db






