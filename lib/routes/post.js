const { Router } = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');

const patcher = (body, fields) => {
  return Object.keys(body).reduce((acc, key) => {
    if(fields.includes(key) && body[key]) {
      acc[key] = body[key];
    }
    return acc;
  }, {});
};

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
  .get('/', (req, res, next) => {
    Post
      .find()
      .then(list => res.send(list))
      .catch(next);

  })



  
  .get('/:id', (req, res, next) => {
    // const _id = req.params.id;
    const { id } = req.params;

    Promise.all([
      Comment
        .where('post')
        .equals(id),
      // .select('comment'),

      Post.findById(id)
    ])
      .then(([comments, foundPost]) => {
        console.log('HELLO COMMENTS****', comments);
        if(!foundPost) {
          return next(new HttpError(404, 'No Post Found With This Id'));
        }
        foundPost.comments = comments;
        res.send(foundPost);
      })
      .catch(next);
  })







  .patch('/:id', ensureAuth, (req, res, next) => {
    const patched = patcher(req.body, ['user', 'caption', 'photoUrl', 'tags']);
    Post
      .findByIdAndUpdate(req.params.id, patched, { new: true })
      .then(post => res.send(post))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  });