const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Post = require('../models/post');

let DUMMY_POSTS = [{
    id: 'post1',
    title: 'Title Example',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt pretium fringilla. Etiam vitae est et tortor tristique cursus. Nam consequat velit eget ante tempor tincidunt. Donec velit nisi, posuere lacinia feugiat non, porta sit amet sem. Etiam euismod imperdiet maximus. Quisque eu diam ut massa mollis rhoncus. Pellentesque sit amet velit at elit rhoncus consequat ut eu diam. Ut eleifend ligula nisi, sit amet pellentesque odio vestibulum at. Nullam bibendum diam et velit auctor accumsan.',
    image: 'http://localhost:3000/sample-post.jpg',
    creator: 'user1',
    date: new Date().toLocaleDateString(),
  },
  {
    id: 'test2',
    title: 'Title Example',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt pretium fringilla. Etiam vitae est et tortor tristique cursus. Nam consequat velit eget ante tempor tincidunt. Donec velit nisi, posuere lacinia feugiat non, porta sit amet sem. Etiam euismod imperdiet maximus. Quisque eu diam ut massa mollis rhoncus. Pellentesque sit amet velit at elit rhoncus consequat ut eu diam. Ut eleifend ligula nisi, sit amet pellentesque odio vestibulum at. Nullam bibendum diam et velit auctor accumsan.',
    image: 'http://localhost:3000/sample-post.jpg',
    creator: 'user2',
    date: new Date().toLocaleDateString(),
  }
];

const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a post.',
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError(
      'Could not find a post for the provided id.',
      404
    );
    return next(error);
  }

  res.json({
    post: post.toObject({ getters: true })
  });
};


const getPostByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let posts;
  try {
    posts = await Post.find({
      creator: userId
    });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a post.',
      500
    );
    return next(error);
  }

  if (!posts || posts.length === 0) {
    return next(
      new HttpError('Could not find a post for the provided user id.', 404)
    );
  }

  res.json({
    posts: posts.map(post => post.toObject({ getters: true }))
  });
};

const createPost = async (req, res, next) => {
  // console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, body, image, creator, date } = req.body;

  const createdPost = new Post({
    title,
    body,
    image: 'http://localhost:3000/sample-post.jpg',
    creator,
    date
  });

  try {
    await createdPost.save();
  } catch (err) {
    const error = new HttpError(
      'Creating post failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({post: createdPost});
};

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, body } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }
  post.title = title;
  post.body = body;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  res.status(200).json({post: post.toObject({ getters: true })});
};

const deletePost = (req, res, next) => {
  const postId = req.params.pid;
  if (!DUMMY_POSTS.find(p => p.id === postId)) {
    throw new HttpError('Could not find a post for that id.', 404);
  }
  DUMMY_POSTS = DUMMY_POSTS.filter(p => p.id !== postId);
  res.status(200).json({ message: 'Deleted post.' });
};

exports.getPostById = getPostById;
exports.getPostByUserId = getPostByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
