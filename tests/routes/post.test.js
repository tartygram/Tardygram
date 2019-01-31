require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
// const { Types } = require('mongoose');
const Post = require('../../lib/models/Post');
const User = require('../../lib/models/User');
const request = require('supertest');
const app = require('../../lib/app');
const { getToken } = require('../dataHelper');

const createUser = (username, password, profilePhotoUrl) => {
  return User
    .create({ username, password, profilePhotoUrl })
    .then(user => ({ ...user, _id: user._id.toString() }));
};

const createPost = (username) => {
  return createUser(username, 'password', 'string')
    .then(user => {
      return Post.create({ 
        user: user._id,
        photoUrl: 'string',
        caption: 'string',
        tags: ['tag1', 'tag2', 'tag3']
      })
        .then(post => ({ ...post, _id: post._id.toString() })); 
    });
};

describe('Post model', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(done);
  });
  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can post a post', () => {
    return createUser('Bill', 'password', 'string')
      .then(user => {
        return request(app)
          .post('/auth/signin')
          .send({ username: 'Bill', password: 'password', profilePhotoUrl: 'string' })
          .then(() => {
            return request(app)
              .post('/posts')
              .set('Authorization', `Bearer ${getToken()}`)
              .send({
                user: user._id,
                caption: 'Great Post',
                photoUrl: 'string',
                tags: ['tag1', 'tag2', 'tag3']
              })
              .then(res => {
                expect(res.body).toEqual({
                  user: expect.any(String),
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

  it('get a list of posts', () => {
    return Promise.all(['billybob1', 'billybob2', 'Bill'].map(createPost))
      .then(() => {
        return request(app)
          .get('/posts')
          .set('Authorization', `Bearer ${getToken()}`);
      })
      .then(res => {
        expect(res.body).toEqual(123);
      });
  });
});