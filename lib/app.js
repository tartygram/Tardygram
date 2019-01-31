const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');
const { bearerToken } = require('./middleware/ensureAuth');
const posts = require('../lib/routes/post');
const comments = require('../lib/routes/comment');


app.use(express.json());

app.use(bearerToken);
app.use('/auth', connection, require('./routes/auth'));
app.use('/posts', posts);
app.use('/comments', comments);
//routes go here

app.use(notFound);
app.use(handler);


module.exports = app;