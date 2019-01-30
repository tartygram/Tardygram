require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
// const { tokenize, untokenize } = require('../../lib/utils/token');

describe('User model', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(done);
  });
  afterAll(done => {
    mongoose.connection.close(done);
  });


  it('validates a good model', () => {
    const user = new User({
      username: 'Bill',
      password: 'password', 
      profilePhotoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51ivptfSjlL.jpg'
    });
    expect(user.toJSON()).toEqual({ username: 'Bill', _id: expect.any(Types.ObjectId), profilePhotoUrl: expect.any(String) });
  });
  it('stores a temp password', () => {
    const user = new User({
      username: 'Bill',
      password: 'password', 
      profilePhotoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51ivptfSjlL.jpg'
    });
    expect(user._tempPassword).toEqual('password');
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
      });
  });

  it('compares clear to hashedPassword', () => {
    const user = new User({
      username: 'Bill',
      password: 'password', 
      profilePhotoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51ivptfSjlL.jpg'
    });
    return user.save()
      .then(user => {
        return user.compare('password');
      })
      .then(res => {
        expect(res).toBeTruthy;
      });
  });
  
});