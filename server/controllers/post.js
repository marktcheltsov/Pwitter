

const Post = require('../models/post');
const Notification = require('../models/notification');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ValidationErr = require('../errors/validation-err');
const IncomprehensibleErr = require('../errors/incomprehensible-err');
const WrongData = require('../errors/wrong-data-err');
const DataAuthErr = require('../errors/data-auth-err');

const createPost = async (req, res, next) => {
    const body = req.body
    body.user = req.user._id
    try {
        const post = await Post.create(body)
        const user = await User.findByIdAndUpdate(req.user._id, { $addToSet: { posts: post._id } }, { new: true })
        const notify = await Notification.create({body: 'Your post was created', user: req.user._id})
        return res.status(200).json(post);
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

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}).populate('user').sort({ createdAt: -1 })
        return res.status(200).json(posts);
    } catch (e) {
          console.error(e);
          const err = new IncomprehensibleErr('произошла ошибка');
          next(err);
    }
}

const getPost = async (req, res, next) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id)
        .populate('user')
        .populate({
            path: 'comments',
            populate: { path: 'user' },
            options: { sort: { createdAt: -1 } } 
        });
        if (!post) {
            const err = new NotFoundError('Запрашиваемый пост не найден');
            return next(err);
        }
        return res.status(200).json(post);
    } catch (e) {
          console.error(e);
          const err = new IncomprehensibleErr('произошла ошибка');
          next(err);
    }
}

const updatePost = async (req, res, next) => {
    const { id } = req.params
    const { body, image,  } = req.body
    try {
        const post = await Post.findByIdAndUpdate(id,
            { body: body, image: image, updatedAt: Date.now() },
            { new: true })
        if (!post) {
            const err = new NotFoundError('Запрашиваемый пост не найден');
            return next(err);
        }
        return res.status(200).json(post);
    } catch (e) {
        if (e.name === 'ValidationError') {
            console.log(e);
            const err = new ValidationErr('Переданы некорректные данные при создани');
            return next(err);
        }
        console.error(e);
        const err = new IncomprehensibleErr('произошла ошибка');
        next(err);
    }
}

const likePost = async (req, res, next) => {
    const { id } = req.params
    try {
        const post = await Post.findByIdAndUpdate(id, { $addToSet: { likedIds: req.user._id } }, { new: true })
        const owner = await User.findById(post.user)
        const notify = await Notification.create({body: 'Your post was liked', user: owner._id})
        if (!post) {
            const err = new NotFoundError('Запрашиваемый пост не найден');
            return next(err);
        }
        return res.status(200).json(post);
    } catch (e) {
        if (e.name === 'ValidationError') {
            console.log(e);
            const err = new ValidationErr('Переданы некорректные данные при создани');
            return next(err);
        }
        console.error(e);
        const err = new IncomprehensibleErr('произошла ошибка');
        next(err);
    }
}

const deleteLikePost = async (req, res, next) => {
    const { id } = req.params
    try {
        const post = await Post.findByIdAndUpdate(
            id,
            { $pull: { likedIds: req.user._id } },
            { new: true },
        );
        if (!post) {
            const err = new NotFoundError('Запрашиваемый пост не найден');
            return next(err);
        }
        return res.status(200).json(post);
    } catch (e) {
        console.error(e);
        const err = new IncomprehensibleErr('произошла ошибка');
        next(err);
    }
}

const deletePost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
          const err = new NotFoundError('Запрашиваемый пост не найдена');
          return next(err);
        }
        if (post.userId.toString() !== req.user._id) {
          const err = new AccessErr('у вас нет прав на это');
          return next(err);
        }
        post.remove();
        return res.status(200).json(post._id);
    } catch (e) {
        if ((e.name === 'CastError') || (e.name === 'TypeError')) {
            console.error(e);
            const err = new ValidationErr('Переданы некорректные данные при удалении');
            return next(err);
        }
        console.error(e);
        const err = new IncomprehensibleErr('произошла ошибка');
        next(err);
    }
}

module.exports = {
    createPost,
    updatePost,
    likePost,
    deleteLikePost,
    deletePost,
    getPosts,
    getPost,
};