const Post = require('../lib/models/Post');
const User = require('../lib/models/User');
const Chance = require('chance');
const chance = new Chance();

const DEFAULT_TOTAL_USERS = 10;
const DEFAULT_TOTAL_POSTS = 1000;

module.exports = ({ totalUsers = DEFAULT_TOTAL_USERS, totalPosts = DEFAULT_TOTAL_POSTS }) => {
  return Promise.all(
    [...Array(totalUsers)].map((ele, i) => User.create({ email: `seed${i}@test.com`, password: 'password' }))
  )
    .then(users => {
      return Promise.all(
        [...Array(totalPosts)].map(() => {
          return Post.create({
            username: users._id,
            caption: chance.sentence(),
            photoUrl: 'string',
            tags: ['tag1', 'tag2', 'tag3']
          });
        })
      );
    });
};