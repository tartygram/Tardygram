require('dotenv').config();
require('../../lib/utils/connect')();
const { Types } = require('mongoose');
const Post = require('../../lib/models/Post');
describe('post model', () => {
  it('validates a good post model', () => {
    const post = new Post({
      caption: 'Great Post',
      photoUrl: 'string',
      tags: ['tag1', 'tag2', 'tag3']
    });
    expect(post).toEqual({
      caption: 'Great Post',
      photoUrl: 'string',
      tags: ['tag1', 'tag2', 'tag3'],
      _id: expect.any(Object)
    });
  });
});