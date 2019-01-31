const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');
const { bearerToken } = require('./middleware/ensureAuth');
const post = require('../lib/routes/post');


app.use(express.json());

app.use(bearerToken);
app.use('/auth', connection, require('./routes/auth'));
app.use('/post', post);
//routes go here

app.use(notFound);
app.use(handler);


module.exports = app;