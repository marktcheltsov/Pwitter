const express = require('express');

const { PORT = 8000 } = process.env;

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');


const app = express();

const { auth } = require('./middlewares/auth');
const { createUser, login, getCurrentUser, updateUser } = require('./controllers/user');
const userRouter = require('./routes/user');
const { handleError } = require('./middlewares/handleError');
const postRouter = require('./routes/post');
const { likePost } = require('./controllers/post');
const commentRouter = require('./routes/comments');
const { getNotification } = require('./controllers/notifications');
const notificationRouter = require('./routes/notification');

const allowedCors = ['http://localhost:3000'];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '10mb' }));


app.post('/register', createUser);
app.post('/login', login);

app.use(auth);

app.use('/users', userRouter);
app.get('/user/me', getCurrentUser)
app.patch('/user/me', updateUser);
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/notifications', notificationRouter)

app.use('*', (req, res, next) => {
  console.log('s')
    const err = new NotFoundError('указан неправильный путь');
    next(err);
});
  
app.use((err, req, res, next) => {
    handleError(err, req, res, next);
});

mongoose.connect('mongodb://localhost:27017/twitterDb')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log('Connection failed'))