const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ValidationErr = require('../errors/validation-err');
const IncomprehensibleErr = require('../errors/incomprehensible-err');
const WrongData = require('../errors/wrong-data-err');
const DataAuthErr = require('../errors/data-auth-err');

async function createUser(req, res, next) {
    try {
      const passwordHash = await bcrypt.hash(req.body.password, 10)
      const newUser = await User.create({
        email: req.body.email,
        password: passwordHash,
        name: req.body.name,
        username: req.body.username
      })
      const userWithoutPassword = await User.findById(newUser._id).select('-password');
      return res.status(200).json(userWithoutPassword);
    } catch (e) {
        if (e.name === 'ValidationError') {
            console.log(e);
            const err = new ValidationErr('Переданы некорректные данные при создани');
            next(err);
          }
          if (e.code === 11000) {
            console.log(e);
            const err = new DataAuthErr('пользователь с такой почтой уже есть');
            next(err);
          }
          console.error(e);
          const err = new IncomprehensibleErr('произошла ошибка');
          next(err);
    }
  }

  const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        const err = new WrongData('Неправильные почта или пароль');
        return next(err);
      }
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        const err = new WrongData('Неправильные почта или пароль');
        return next(err);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.status(200).json({ jwt: token });
    } catch (e) {
      console.log(e);
      const err = new IncomprehensibleErr('произошла ошибка');
      return next(err);
    }
  };

  const getUsers= async (req, res, next) => {
    try {
      const users = await User.find({})
      .sort({ createdAt: -1 })
      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      const err = new IncomprehensibleErr('произошла ошибка');
      return next(err);
    }
  };

  const getUser = async (req, res, next) => {
    const { id } = req.params
    try {
      const user = await User.findById(id).populate({
        path: 'posts',
        populate: {
          path: 'user',
          model: 'user'
        }
      });
      if (!user) {
        const err = new NotFoundError('Запрашиваемый пользователь не найден');
        return next(err);
      }
      return res.status(200).json(user);
    } catch (e) {
      if ((e.name === 'CastError') || (e.name === 'TypeError')) {
        console.error(e);
        const err = new ValidationErr('Переданы некорректные данные');
        return next(err);
      }
      console.error(e);
      const err = new IncomprehensibleErr('произошла ошибка');
      return next(err);
    }
  };

  const getCurrentUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).populate({
        path: 'posts',
        populate: {
          path: 'user',
          model: 'user'
        }
      });
      if (!user) {
        const err = new NotFoundError('Запрашиваемый пользователь не найден');
        return next(err);
      }
      return res.status(200).json(user);
    } catch (e) {
      if ((e.name === 'CastError') || (e.name === 'TypeError')) {
        console.log(e);
        const err = new ValidationErr('Переданы некорректные данные');
        return next(err);
      }
      console.error(e);
      const err = new IncomprehensibleErr('Произошла ошибка');
      return next(err);
    }
  }
  const addFollowing = async (req, res, next) => {
      try {
        const { id } = req.params
        const userME = await User.findByIdAndUpdate(req.user._id,
            { $addToSet: { followingIds: id } },
            { new: true });
        const user = await User.findByIdAndUpdate(id,
            { $addToSet: { followersCount: req.user._id } },
            { new: true })
        if (!userME) {
            const err = new NotFoundError('Запрашиваемый юзер не найден');
            return next(err);
        }
        if (!user) {
            const err = new NotFoundError('Запрашиваемый юзер не найден');
            return next(err);
        }
        return res.status(200).json(id);
      } catch (e) {
        if ((e.name === 'CastError') || (e.name === 'TypeError')) {
            console.error(e);
            const err = new ValidationErr('Переданы некорректные данные');
            return next(err);
          }
          console.error(e);
          const err = new IncomprehensibleErr('произошла ошибка');
          return next(err);
        }
      }

      const deleteFollowing = async (req, res, next) => {
        try {
          const { id } = req.params
          const userME = await User.findByIdAndUpdate(req.user._id,
              { $pull: { followingIds: id } },
              { new: true },);
          const user = await User.findByIdAndUpdate(id,
              { $pull: { followersCount: req.user._id} },
              { new: true })
              console.log(user)
          if (!userME) {
              const err = new NotFoundError('Запрашиваемый юзер не найден');
              return next(err);
          }
          if (!user) {
              const err = new NotFoundError('Запрашиваемый юзер не найден');
              return next(err);
          }
          return res.status(200).json(id);
        } catch (e) {
          if ((e.name === 'CastError') || (e.name === 'TypeError')) {
              console.error(e);
              const err = new ValidationErr('Переданы некорректные данные');
              return next(err);
            }
            console.error(e);
            const err = new IncomprehensibleErr('произошла ошибка');
            return next(err);
          }
        }

    const updateUser = async (req, res, next) =>  {
        const { name, bio, username, coverImage, profileImage } = req.body;
        try {
            const user = await User.findByIdAndUpdate(
                req.user._id,
                { name, bio, username, coverImage, profileImage },
                { new: true, runValidators: true },
              );
            if (!user) {
                const err = new NotFoundError('Запрашиваемый пользователь не найден');
                return next(err);
              }
              return res.status(200).json(user);
        } catch (e) {
            if (e.name === 'ValidationError') {
                console.log(e);
                const err = new ValidationErr('Переданы некорректные данные при создани');
                return next(err);
              }
              console.error(e);
              const err = new IncomprehensibleErr('произошла ошибка');
              return next(err);
        }
    }

module.exports = {
    createUser,
    login,
    getUsers,
    getUser,
    getCurrentUser,
    addFollowing,
    deleteFollowing,
    updateUser,
};
  