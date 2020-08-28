const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    zipCode: {
        type: Number
    },
    phoneNumber: {
        type: Number
    }
})
module.exports = mongoose.model('User', UserSchema)