const { Router } = require('express');
const Comment = require('../models/Comment');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { comment, post } = req.body;
    console.log(req.body);
    Comment
      .create({
        comment,
        commentBy: req.user._id,
        post
      })
      .then(comment => res.send(comment))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment
      .findByIdAndDelete(req.params.id)
      .then(foundComment => {
        if(!foundComment) {
          next(new HttpError(404, 'No comment Found'));
        }
        res.send({ deleted: 1 });
      });
  });