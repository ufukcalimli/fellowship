const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

module.exports = mongoose.model('User', TagSchema)