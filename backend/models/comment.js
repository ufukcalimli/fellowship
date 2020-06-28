const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
})

module.exports = mongoose.model('comment', CommentSchema)