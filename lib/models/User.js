const mongoose = require('mongoose');
// const { hash, compare } = require('../utils/hash');
// const { tokenize, untokenized } = require('../../lib/utils/token');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profilePhotoUrl: { type: String, required: true }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;