require('../dataHelper');
const Post = require('../../lib/models/Post');
describe('post model', () => {

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