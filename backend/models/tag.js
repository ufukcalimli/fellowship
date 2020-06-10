const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    posts: [
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

module.exports = mongoose.model('tag', TagSchema)
