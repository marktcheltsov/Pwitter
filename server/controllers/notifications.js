const Notification = require('../models/notification');

const getNotification = async (req, res, next) => {
    try {
        const posts = await Notification.find({}).sort({ createdAt: -1 })
        return res.status(200).json(posts);
    } catch (e) {
          console.error(e);
          const err = new IncomprehensibleErr('произошла ошибка');
          next(err);
    }
}

const cheakNotifications = async (req, res, next) => {
    try {
        const userId = req.user._id;
        await Notification.updateMany(
            { user: userId },
            { $set: { wasCheaked: true } }
        );
        const posts = await Notification.find({ user: userId }).sort({ createdAt: -1 });
        return res.status(200).json(posts);
    } catch (e) {
        console.error(e);
        const err = new IncomprehensibleErr('произошла ошибка');
        next(err);
    }
}

module.exports = {
    getNotification,
    cheakNotifications,
};