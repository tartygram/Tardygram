require('../dataHelper');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
const { tokenize } = require('../../lib/utils/token');

describe('User model', () => {
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
  it('has a required username', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.username.message).toEqual('Path `username` is required.');
  });

  it('can find a user by token and removes passwordHash and version', () => {
    const user = new User({
      username: 'Bill',
      password: 'password', 
      profilePhotoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51ivptfSjlL.jpg'
    });
    return user.save()
      .then(user => {
        return tokenize(user);
      })
      .then(token => {
        return User.findByToken(token);
      })
      .then(user => {
        expect(user).toEqual({ username: 'Bill', _id: expect.any(String), profilePhotoUrl: expect.any(String) });
      });
  });
  it('returns a token', () => {
    const user = new User({
      username: 'Bill',
      password: 'password', 
      profilePhotoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51ivptfSjlL.jpg'
    });
    return user.save()
      .then(user => {
        return user.authToken();
      })
      .then(token => {
        expect(token).toEqual(expect.any(String));
      });
  });
});