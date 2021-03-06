// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Post = require('../models/post');
const User = require('../models/user');

const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find({}, {});
  } catch (err) {
    const error = new HttpError(
      'Fetching posts failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({
    posts: posts.map(post => post.toObject({
      getters: true
    }))
  });
};

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

  let userWithPosts;
  try {
    userWithPosts = await User.findById(userId).populate('posts');
    // TODO: user the previous way
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a post.',
      500
    );
    return next(error);
  }

  if (!userWithPosts || userWithPosts.length === 0) {
    return next(
      new HttpError('Could not find a post for the provided user id.', 404)
    );
  }

  res.json({
    posts: userWithPosts.posts.map(post => post.toObject({ getters: true }))
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
    image: image || 'http://localhost:3000/sample-post.jpg',
    creator,
    date
  });

  let user;
  try {
    user = await User.findById(creator)
  } catch (err) {
    const error = new HttpError(
      'Creating post failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }


  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({
      session: sess
    });
    user.posts.push(createdPost);
    await user.save({
      session: sess
    });
    await sess.commitTransaction();
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
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
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

const deletePost = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete post.',
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError('Could not find post for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    post.creator.posts.pull(post);
    await post.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete post.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted post.' });
};

exports.getPostById = getPostById;
exports.getPostByUserId = getPostByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.getPosts= getPosts;
