const router = require('express').Router();

const {
    createPost,
    updatePost,
    likePost,
    deleteLikePost,
    deletePost,
    getPosts,
    getPost,
} = require('../controllers/post');

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/likes/:id', likePost);
router.delete('/likes/:id', deleteLikePost);

const postRouter = router;
module.exports = postRouter;