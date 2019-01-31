const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  commentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;