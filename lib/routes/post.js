const { Router } = require('express');
const Post = require('../models/Post');
// const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    console.log(' HELLO WORLD', req.user);
    const { caption, photoUrl, tags } = req.body;
    Post
      .create({
        user: req.user._id, caption, photoUrl, tags 
      })
      .then(post => {
        res.send(post);
      })
      .catch(next);
  })
  .get('/', (req, res) => {
    Post
      .find()
      .then(list => res.send(list));
  });