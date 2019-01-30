const { Router } = require('express');
const User = require('../models/User');
// const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password, profilePhotoUrl } = req.body;
    console.log(req.body);
    User
      .create({ username, password, profilePhotoUrl })
      .then(user => {
        res.send({ user, token: user.authToken() });
      })
      .catch(next);
  });