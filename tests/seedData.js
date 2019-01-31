const Post = require('../lib/models/Post');
const User = require('../lib/models/User');
const Comment = require('../lib/models/Comment');
const Chance = require('chance');
const chance = new Chance();

const DEFAULT_TOTAL_USERS = 10;
const DEFAULT_TOTAL_POSTS = 100;
const DEFAULT_TOTAL_COMMENTS = 110;

module.exports = ({
  totalUsers = DEFAULT_TOTAL_USERS,
  totalPosts = DEFAULT_TOTAL_POSTS,
  totalComments = DEFAULT_TOTAL_COMMENTS
}) => {
  return Promise.all(
    [...Array(totalUsers)].map((ele, i) => User.create({
      username: `Bill${i}`,
      password: 'password',
      profilePhotoUrl: 'string'
    }))
  )
    .then(users => {
      return Promise.all([
        Promise.resolve(users),
        [...Array(totalPosts)].map(() => {
          return Post.create({
            user: chance.pickone(users)._id,
            caption: chance.sentence(),
            photoUrl: 'string',
            tags: ['tag1', 'tag2', 'tag3']
          });
        })
      ]);
    })
    .then(([users, posts]) => {
      console.log('****USERS****', users);
      console.log('****POSTS****', posts);
      return Promise.all(
        [...Array(totalComments)].map(() => {
          return Comment.create({
            commentBy: chance.pickone(users)._id,
            post: chance.pickone(posts)._id,
            comment: 'Nice Photo'
          });
        })
      );
    });
};