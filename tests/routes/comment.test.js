require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
// const { getToken, getPost } = require('../dataHelper');

describe('comment model', () => {
  afterAll(done => {
    mongoose.connection.close(done);
  });

  
})