const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        require: true
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        require: true
    } 
})

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;