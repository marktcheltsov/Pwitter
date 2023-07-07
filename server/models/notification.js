const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    body: {
        type: String,
        require: true
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    wasCheaked: {
        type: Boolean,
        default: false
    }
})

const notificationModel = mongoose.model('notification', notificationSchema);

module.exports = notificationModel;