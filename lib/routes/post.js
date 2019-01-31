const { Router } = require('express');
const Post = require('../models/Post');
const { HttpError } = require('../middleware/error');
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
  })
  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Post.findById(_id)
      .then(foundPost => {
        if(!foundPost) {
          return next(new HttpError(404, 'No Post Found With This Id'));
        }
        res.send(foundPost);
      })
      .catch(next);
  });