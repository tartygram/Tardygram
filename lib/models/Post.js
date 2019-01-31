const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  photoUrl: { type: String, required: true },
  caption: { type: String, required: true },
  tags: { type: Array, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;