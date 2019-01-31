require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Post = require('../lib/models/Post');
const User = require('../lib/models/User');
const request = require('supertest');
const app = require('../lib/app');

beforeAll(() => {
  connect();
});

beforeEach(done => {
  mongoose.connection.dropDatabase(done);
});

beforeEach(() => {
  return seedData({ totalUsers: 3, totalTweets: 5 });
});

let token;
beforeEach(() => {
  return User.findOne({ username: 'seed1@test.com' })
    .then(user => {
      return request(app)
        .post('/auth/signin')
        .send({ user: user.username, password: 'password', profilePhotoUrl: 'string' });
    })
    .then(res => {
      token = res.body.token;
    });
});

afterAll(done => {
  mongoose.connection.close(done);
});

const prepare = model => JSON.parse(JSON.stringify(model));
const prepareAll = models => models.map(prepare);

const createGetters = Model => {
  return {
    [`get${Model.modelName}`]: (query = {}) => Model.findOne(query).then(prepare),
    [`get${Model.modelName}s`]: (query = {}) => Model.find(query).then(prepareAll),
  };
};

module.exports = {
  ...createGetters(User),
  ...createGetters(Post),
  getToken: () => token
};