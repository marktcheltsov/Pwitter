const router = require('express').Router();

const {
    createComment
} = require('../controllers/comment');

router.post('/:id', createComment);

const commentRouter = router;
module.exports = commentRouter;