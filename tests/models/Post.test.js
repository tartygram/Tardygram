require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Post = require('../../lib/models/Post');
describe('post model', () => {
  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('validates a good post model', () => {
    const post = {
      caption: 'Great Post',
      photoUrl: 'string',
      tags: ['tag1', 'tag2', 'tag3']
    };
    const newPost = new Post(post);
    const jsonPost = newPost.toJSON();
    expect(jsonPost).toEqual({
      caption: 'Great Post',
      photoUrl: 'string',
      tags: ['tag1', 'tag2', 'tag3'],
      _id: expect.any(Object)
    });
  });
});