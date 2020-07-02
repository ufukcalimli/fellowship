const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String
    },
    languages: [
        {
            language: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'language'
            }
        }
    ],
    tags: [
        {
            tag: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tag'
            }
        }
    ],
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
    },
    posts: [
        {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        },
        },
    ],
    comments: [
        {
            comment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment'
            }
        }
    ],
    avatar_path: {
        type: String
    }
});

module.exports = mongoose.model("profile", ProfileSchema);
