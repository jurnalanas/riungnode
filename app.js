const express = require('express');
const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts-routes');
const usersRoute = require('./routes/users-routes');
const commentsRoute = require('./routes/comments-routes');
const HttpError = require('./models/http-error');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoute);
app.use('/api/comments', commentsRoute);


app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({
    message: error.message || 'An unknown error occurred!'
  });
});

app.listen(5000);
