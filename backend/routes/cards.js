const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlvalidator = require('../middlewares/url-validation');

const {
  createCard, getCards, deleteCard, likeCard, deletelikeCard,
} = require('../controllers/cards');

router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(urlvalidator, 'custom URL validator'),
    }),
  }),
  createCard,
);
router.get('/cards', getCards);
router.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteCard,
);
router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deletelikeCard,
);

module.exports = router;
