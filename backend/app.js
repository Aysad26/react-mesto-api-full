require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors, celebrate, Joi } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const NotFoundError = require('./errors/not-found-err');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const urlvalidator = require('./middlewares/url-validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(cors);

app.use('/', express.json());

app.use(requestLogger);

// эмуляция падения серевера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(urlvalidator, 'custom URL validator'),
    }),
  }),
  createUser,
);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.get('/signout', (req, res) => {
  res.status(200).clearCookie('jwt').send({ message: 'Выход' });
});

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());
// Обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
