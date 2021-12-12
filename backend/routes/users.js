const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidator = require('../constants');
const controllers = require('../controllers/users');

router.get('/users/me', controllers.getMyProfile);

router.get('/users', controllers.getUsers);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), controllers.getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), controllers.updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlValidator),
  }),
}), controllers.updateAvatar);

module.exports = router;
