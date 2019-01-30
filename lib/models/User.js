const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize, untokenized } = require('../../lib/utils/token');

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  passwordHash: { type: String, require: true }

});