const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

let DUMMY_POSTS = [{
    id: 'post1',
    title: 'Title Example',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt pretium fringilla. Etiam vitae est et tortor tristique cursus. Nam consequat velit eget ante tempor tincidunt. Donec velit nisi, posuere lacinia feugiat non, porta sit amet sem. Etiam euismod imperdiet maximus. Quisque eu diam ut massa mollis rhoncus. Pellentesque sit amet velit at elit rhoncus consequat ut eu diam. Ut eleifend ligula nisi, sit amet pellentesque odio vestibulum at. Nullam bibendum diam et velit auctor accumsan.',
    imageUrl: 'http://localhost:3000/sample-post.jpg',
    creator: 'user1',
    date: new Date().toLocaleDateString(),
  },
  {
    id: 'test2',
    title: 'Title Example',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt pretium fringilla. Etiam vitae est et tortor tristique cursus. Nam consequat velit eget ante tempor tincidunt. Donec velit nisi, posuere lacinia feugiat non, porta sit amet sem. Etiam euismod imperdiet maximus. Quisque eu diam ut massa mollis rhoncus. Pellentesque sit amet velit at elit rhoncus consequat ut eu diam. Ut eleifend ligula nisi, sit amet pellentesque odio vestibulum at. Nullam bibendum diam et velit auctor accumsan.',
    imageUrl: 'http://localhost:3000/sample-post.jpg',
    creator: 'user2',
    date: new Date().toLocaleDateString(),
  }
];

const getPostById = (req, res, next) => {
  const postId = req.params.pid;

  const posts = DUMMY_POSTS.find(p => {
    return p.id === postId;
  });

  if (!posts || posts.length === 0) {
    throw new HttpError('Could not find a post for the provided id.', 404);
  }

  res.json({
    posts
  });
};


const getPostByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const posts = DUMMY_POSTS.find(p => {
    return p.creator === userId;
  });

  if (!posts || posts.length === 0) {
    return next(
      new HttpError('Could not find a post for the provided user id.', 404)
    );
  }

  res.json({
    posts
  });
};

const createPost = (req, res, next) => {
  const { title, body, image, creator, date } = req.body;

  const createdPost = {
    id: uuid(),
    title,
    body,
    image,
    creator,
    date
  };

  DUMMY_POSTS.push(createdPost); //unshift(createdPost)

  res.status(201).json({post: createdPost});
};

const updatePost = (req, res, next) => {
  const { title, body } = req.body;
  const postId = req.params.pid;

  const updatedPost = { ...DUMMY_POSTS.find(p => p.id === postId) };
  const postIndex = DUMMY_POSTS.findIndex(p => p.id === postId);
  updatedPost.title = title;
  updatedPost.body = body;
  DUMMY_POSTS[postIndex] = updatedPost;

  res.status(200).json({post: updatedPost});
};

const deletePost = (req, res, next) => {
  const postId = req.params.pid;
  DUMMY_POSTS = DUMMY_POSTS.filter(p => p.id !== postId);
  res.status(200).json({ message: 'Deleted post.' });
};

exports.getPostById = getPostById;
exports.getPostByUserId = getPostByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
