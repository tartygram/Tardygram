require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const { getToken, getPost } = require('../dataHelper');

describe('Post model', () => {
  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can post a post', () => {
    return request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({
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

  it('get a list of posts', () => {
    return request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${getToken()}`)
      .then(res => {
        expect(res.body).toHaveLength(5);
      });
  });
  it('can get a post by id', () => {
    return getPost()
      .then(post => {
        return request(app)
          .get(`/posts/${post._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 
          user: expect.any(String),
          photoUrl: 'string',
          caption: expect.any(String),
          tags: ['tag1', 'tag2', 'tag3'],
          __v: 0,
          _id: expect.any(String)
        });
      });
  });
  it('can patch a post', () => {
    return getPost()
      .then(post => {
        return request(app)
          .patch(`/posts/${post._id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .send({ caption: 'HELLO PEOPLE' });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          user: expect.any(String),
          photoUrl: 'string',
          caption: 'HELLO PEOPLE',
          tags: ['tag1', 'tag2', 'tag3'],
          __v: 0,
          _id: expect.any(String)
        });

      });
  });
  it('can delete by id', () => {
    return getPost()
      .then(post => {
        return request(app)
          .delete(`/posts/${post._id}`)
          .set('Authorization', `Bearer ${getToken()}`)

      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});