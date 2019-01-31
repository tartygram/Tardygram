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
  });