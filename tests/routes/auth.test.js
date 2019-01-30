require('../../lib/routes/auth');
require('dotenv').config();
const User = require('../../lib/models/User');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const app = require('../../lib/app');

const createUser = (username) => {
  return User.create({ username, password: 'password', profilePhotoUrl: 'string' });
};

describe('auth route testing', () => {

  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  
  it('can signup a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ username: 'Bill', password: 'password', profilePhotoUrl: 'string' })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            username: 'Bill',
            profilePhotoUrl: 'string'
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in', () => {
    return createUser('Bill')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ 
            username: 'Bill', password: 'password'
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                _id: expect.any(String),
                username: 'Bill',
                profilePhotoUrl: 'string'
              },
              token: expect.any(String)
            });
          });
      });
  });

  it('can not /signin a user with bad password', () => {
    return createUser('Bill')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'Bill',
            password: 'badPassword',
            profilePhotoUrl: 'string'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });

  it('can not /signin a user with bad username', () => {
    return createUser('Jack')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'Bill',
            password: 'password',
            profilePhotoUrl: 'string'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });

  it('can verify a JWT on a user', () => {
    return createUser('Bill')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'Bill',
            password: 'password',
            profilePhotoUrl: 'string'
          })
          .then(res => res.body.token);
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          username: 'Bill',
          _id: expect.any(String),
          profilePhotoUrl: 'string'
        });
      });
  });
});