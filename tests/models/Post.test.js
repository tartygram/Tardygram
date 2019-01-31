require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
// const { Types } = require('mongoose');
// const Post = require('../../lib/models/Post');
const User = require('../../lib/models/User');
const request = require('supertest');
const app = require('../../lib/app');

const createUser = (username, password, profilePhotoUrl) => {
  return User
    .create({ username, password, profilePhotoUrl })
    .then(user => ({ ...user, _id: user._id.toString() }));
  
};

describe('Post model', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(done);
  });
  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('validates a good Post model', () => {
    return createUser('Bill', 'password', 'string')
      .then(user => {
        return request(app)
          .post('/posts')
          .send({
            username: user._id,
            caption: 'Great Post',
            photoUrl: 'string',
            tags: ['tag1', 'tag2', 'tag3']
          })
          .then(res => {
            expect(res.body).toEqual({
              username: expect.any(String),
              caption: 'Great Post',
              photoUrl: expect.any(String),
              tags: ['tag1', 'tag2', 'tag3'],
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
});