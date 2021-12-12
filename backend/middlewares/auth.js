const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauth-err');

module.exports = ((req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
});
