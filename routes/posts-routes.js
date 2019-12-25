const express = require('express');

const router = express.Router();

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

router.get('/:pid', (req, res, next) => {
  const postId = req.params.pid;
  const post = DUMMY_POSTS.find(p => {
    return p.id === postId;
  })

  if (!post) {
    const error = new Error('Could not find a post for the provided id.');
    error.code = 404;
    throw error;
  }

  res.json({post});
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;

  const post = DUMMY_POSTS.find(p => {
    return p.creator === userId;
  });

  if (!post) {
    const error = new Error('Could not find a post for the provided user id.');
    error.code = 404;
    return next(error);
  }

  res.json({ post });
});

module.exports = router;