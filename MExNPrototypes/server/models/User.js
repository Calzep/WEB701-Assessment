const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    tokens: {
        type: Number,
        required: true
    }  
})

const User = mongoose.model("User", UserSchema)
module.exports = User