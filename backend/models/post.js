const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    label: {
        type: String,
        default: 'blog_post'
    },
    created_at: {
        type: Date,
        default: Date.now  
    },
    tags: [
        {
            tag: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tag'
            }
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
})

module.exports = mongoose.model('post', PostSchema)