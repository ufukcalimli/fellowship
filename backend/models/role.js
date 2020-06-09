const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('role', RoleSchema)