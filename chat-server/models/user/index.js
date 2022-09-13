const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const userSchema = new Schema({
    account: { type: String, maxlength: 20 },
    username: { type: String, maxlength: 20 },
    password: { type: String },
    id: { type: String, unique: true },
    create_time: { type: Number, default: Date.now() },
    avatar: { type: String, default: 'https://reactlmh.oss-cn-beijing.aliyuncs.com/chatfiles/default.jpg' },
    chat_id: { type: String, maxlength: 20 },
    sex: { type: Number },
    background: { type: String, default: 'https://reactlmh.oss-cn-beijing.aliyuncs.com/chatfiles/background.jpg' },
    sign: { type: String, default: '' }
})

userSchema.index({ id: 1 })

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel


// UserModel.updateMany({ password: 'e10adc3949ba59abbe56e057f20f883e' }, { avatar: 'https://reactlmh.oss-cn-beijing.aliyuncs.com/chatfiles/default.jpg' ,background: 'https://reactlmh.oss-cn-beijing.aliyuncs.com/chatfiles/background.jpg' }, function(res, err) {
//     console.log(res)
//     console.log(err)
// })