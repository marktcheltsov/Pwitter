
const Comment = require('../models/comment');
const User = require('../models/user');
const Notification = require('../models/notification');
const Post = require('../models/post');
const NotFoundError = require('../errors/not-found-err');
const ValidationErr = require('../errors/validation-err');
const IncomprehensibleErr = require('../errors/incomprehensible-err');
const WrongData = require('../errors/wrong-data-err');
const DataAuthErr = require('../errors/data-auth-err');

const createComment = async (req, res, next) => {
    const {id} = req.params;
    const body = req.body;
    body.user = req.user._id
    body.post = id
    try {
        const comment = await Comment.create(req.body)
        const post = await Post.findByIdAndUpdate(id, { $addToSet: { comments: comment._id } }, { new: true } );
        const owner = await User.findById(post.user)
        const notify = await Notification.create({body: 'Your post was commeted', user: owner._id})
        return res.status(200).json(comment);
    } catch (e) {
        if (e.name === 'ValidationError') {
            console.log(e);
            const err = new ValidationErr('Переданы некорректные данные при создани');
            next(err);
          }
          console.error(e);
          const err = new IncomprehensibleErr('произошла ошибка');
          next(err);
    }
}

module.exports = {
    createComment
};