require('dotenv').config();
require('../../lib/utils/connect');
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
// const { tokenize, untokenize } = require('../../lib/utils/token');

describe('User model', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good modell', () => {
    const user = new User({
      username: 'Bill'
    });
    expect(user.toJSON()).toEqual({ username: 'Bill', id: expect.any(Types.ObjectId) });
  });

  it('has a required passwordHash', () => {
    return User.create({
      username: 'Bill',
      password: 'password',
      profilePhotoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51ivptfSjlL.jpg'
    })
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
        expect(user.profilePhotoUrl).toEqual(expect.any(String));
      });
  });
});