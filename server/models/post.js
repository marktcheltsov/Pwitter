const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
    likedIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
    }],
    image: {
        type: String,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        default: [],
    }]
})

const postModel = mongoose.model('posts', postSchema);

module.exports = postModel;