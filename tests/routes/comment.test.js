require('dotenv').config();
require('../../lib/utils/connect')();
// const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const { getToken, getPost, getComment } = require('../dataHelper');


describe('comment model', () => {

  it('creates a comment', () => {
    return getPost()
      .then(post => {
        return request(app)
          .post('/comments')
          .set('Authorization', `Bearer ${getToken()}`)
          .send({
            comment: 'hello',
            post: post._id
          })
          .then(res => {
            expect(res.body).toEqual({
              comment: 'hello',
              _id: expect.any(String),
              commentBy: expect.any(String),
              post: expect.any(String),
              __v: 0
            });
          });
      });
  });
  it('can delete a comment by id', () => {
    return getComment()
      .then(comment => {
        return request(app)
          .delete(`/comments/${comment._id}`)
          .set('Authorization', `Bearer ${getToken()}`);

      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });

  });
});