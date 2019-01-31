const { Router } = require('express');
const Post = require('../models/Post');
// const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    console.log(req.body);
    const { username, caption, photoUrl, tags } = req.body;
    Post
      .create({
        username, caption, photoUrl, tags 
      })
      .then(post => {
        res.send(post);
      })
      .catch(next);
  });