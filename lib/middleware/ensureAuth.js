const User = require('../models/User');
const { HttpError } = require('./error');

const bearerToken = (req, res, next) => {
  const token = (req.get('Authorization') || '').replace(/Bearer\s/i, '');

  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  return User.findByToken(req.token)
    .then(user => {
      if(!user) {
        return next(new HttpError());
      }
      req.user = user;
      next();
    })
    .catch(next);
};


module.exports = {
  bearerToken,
  ensureAuth
};