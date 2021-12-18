const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlvalidator = require('../middlewares/url-validation');

const {
  getUsers, getUser, updateUser, getMyProfile,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMyProfile);
router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  getUser,
);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(urlvalidator, 'custom URL validator'),
    }),
  }),
  updateUser,
);

module.exports = router;
