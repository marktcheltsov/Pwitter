const router = require('express').Router();

const {
    getNotification,
    cheakNotifications
} = require('../controllers/notifications');

router.get('/', getNotification);
router.patch('/', cheakNotifications);

const notificationRouter = router;
module.exports = notificationRouter;  