require('../dataHelper');
const Comment = require('../../lib/models/Comment');

describe('comment model', () => {
  it('validates a good comment model', () => {
    const comment = {
      comment: 'Great Comment',
    };
    const newComment = new Comment(comment);
    const jsonComment = newComment.toJSON();
    expect(jsonComment).toEqual({
      comment: 'Great Comment',
      _id: expect.any(Object)
    });
  });
});