const HttpError = require('../models/http-error');

const DUMMY_POSTS = [{
    id: 'post1',
    title: 'Title Example',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt pretium fringilla. Etiam vitae est et tortor tristique cursus. Nam consequat velit eget ante tempor tincidunt. Donec velit nisi, posuere lacinia feugiat non, porta sit amet sem. Etiam euismod imperdiet maximus. Quisque eu diam ut massa mollis rhoncus. Pellentesque sit amet velit at elit rhoncus consequat ut eu diam. Ut eleifend ligula nisi, sit amet pellentesque odio vestibulum at. Nullam bibendum diam et velit auctor accumsan.',
    imageUrl: 'http://localhost:3000/sample-post.jpg',
    user: 'Walter White',
    creator: 'user1',
    date: new Date().toLocaleDateString(),
    commentsId: ['comment1']
  },
  {
    id: 'test2',
    title: 'Title Example',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt pretium fringilla. Etiam vitae est et tortor tristique cursus. Nam consequat velit eget ante tempor tincidunt. Donec velit nisi, posuere lacinia feugiat non, porta sit amet sem. Etiam euismod imperdiet maximus. Quisque eu diam ut massa mollis rhoncus. Pellentesque sit amet velit at elit rhoncus consequat ut eu diam. Ut eleifend ligula nisi, sit amet pellentesque odio vestibulum at. Nullam bibendum diam et velit auctor accumsan.',
    imageUrl: 'http://localhost:3000/sample-post.jpg',
    user: 'Walter White',
    creator: 'user2',
    date: new Date().toLocaleDateString(),
    commentsId: ['comment2']
  }
];

const getPostById = (req, res, next) => {
  const postId = req.params.pid; // { pid: 'p1' }

  const post = DUMMY_POSTS.find(p => {
    return p.id === postId;
  });

  if (!post) {
    throw new HttpError('Could not find a post for the provided id.', 404);
  }

  res.json({
    post
  }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getPostByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const post = DUMMY_POSTS.find(p => {
    return p.creator === userId;
  });

  if (!post) {
    return next(
      new HttpError('Could not find a post for the provided user id.', 404)
    );
  }

  res.json({
    post
  });
};

exports.getPostById = getPostById;
exports.getPostByUserId = getPostByUserId;
