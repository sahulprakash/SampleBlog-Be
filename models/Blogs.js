const mongoose = require('mongoose')
const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports = mongoose.model('Story', StorySchema)