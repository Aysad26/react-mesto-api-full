const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const NotFoundError = require('./errors/not-found-err');
const urlValidator = require('./constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);
app.use(requestLogger);

// эмуляция падения серевера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlValidator),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use(auth);
app.use('/', routerUsers);
app.use('/', routerCards);

app.use(() => {
  throw new NotFoundError('Введён несуществующий адрес');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {//eslint-disable-line
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
