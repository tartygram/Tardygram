require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');
const seedData = require('./tests/seedData');

seedData()
  .then(() => {
    return console.log('****DONE****');
  })
  .finally(() => {
    return mongoose.connection.close();
  });