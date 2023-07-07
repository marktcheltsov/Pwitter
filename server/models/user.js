const mongoose = require('mongoose');
  
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (email) => isEmail(email),
    //   message: (email) => `${email} не прошел валидацию`,
    // },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  bio: {
    type: String,
  },
  emailVerified: {
    type: Date
  },
  image: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  profileImage: {
    type: String,
    default: 'https://avatars.mds.yandex.net/i?id=792f7751c70730deb770f2ce6f360dba463c4d5a-9042177-images-thumbs&n=13'
  },
  hashedPassword: {
    type: String,
  },
  followersCount: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date
  },
  followingIds: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
  hasNotification: {
    type: Boolean,
  },
  posts: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts'
    }]
  },
  comments: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }]
  },
  notifications: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'notification'
    }]
  }
}, { bufferCommands: false });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;