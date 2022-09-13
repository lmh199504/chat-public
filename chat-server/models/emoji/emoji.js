const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const emojiSchema = new Schema({
    user_id: { type: String },
    create_time: { type: Number, required: true },
    url: { type: String, required: true },
    update_time: { type: Number, required: true }
})


const EmojiModel = mongoose.model('emoji', emojiSchema);

module.exports = EmojiModel

