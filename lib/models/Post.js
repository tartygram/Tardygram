const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  photoUrl: { type: String, required: true },
  caption: { type: String, required: true },
  tags: { type: Array, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// const popular = () => ({ $group: { _id: '$post', commentCount: { $sum: 1 } } },
// { $sort: { commentCount: -1 } },
// { $limit: 10 });

postSchema.statics.popularPost = function() {
  return this.aggregate([
    { $group: { _id: '$post', commentCount: { $sum: 1 } } },
    { $sort: { commentCount: -1 } }
  ]);
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;