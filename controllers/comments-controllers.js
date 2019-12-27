const uuid = require('uuid/v4');
const {
  validationResult
} = require('express-validator');

const HttpError = require('../models/http-error');
const Comment = require('../models/comments');

const getCommentById = async (req, res, next) => {
  const commentId = req.params.cid;

  let comment;
  try {
    comment = await Comment.findById(commentId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a comment.',
      500
    );
    return next(error);
  }

  if (!comment) {
    const error = new HttpError(
      'Could not find a post for the provided id.',
      404
    );
    return next(error);
  }

  res.json({
    comment: comment.toObject({ getters: true })
  });
};


const getCommentByPostId = async (req, res, next) => {
  const postId = req.params.pid;

  let postWithComments;
  try {
    postWithComments = await Comment.find({postId: postId}).populate('comments');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a comment.',
      500
    );
    return next(error);
  }
  console.log(postWithComments)
  if (!postWithComments || postWithComments.length === 0) {
    return next(
      new HttpError('Could not find a post for the provided post id.', 404)
    );
  }

  res.json({
    comments: postWithComments.map(comment => comment.toObject({
      getters: true
    }))
  });
};

const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body)
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }


  const {
    postId,
    body,
    creator,
    mood,
    date
  } = req.body;

  const createdComment = new Comment ({
    id: uuid(),
    postId,
    body,
    creator,
    mood,
    date
  });

  try {
    await createdComment.save();
  } catch (err) {
    const error = new HttpError(
      'Creating comment failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({
    comment: createdComment
  });
};

const updateComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const {
    body,
    mood
  } = req.body;
  const commentId = req.params.cid;

  let comment;
  try {
    comment = await Comment.findById(commentId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update comment.',
      500
    );
    return next(error);
  }
  comment.body = body;
  comment.mood = mood;

  try {
    await comment.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update comment.',
      500
    );
    return next(error);
  }

  res.status(200).json({
    comment: comment.toObject({ getters: true })
  });
};

const deleteComment = async (req, res, next) => {
  const commentId = req.params.cid;

  let comment;
  try {
    comment = await Comment.findById(commentId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete comment.',
      500
    );
    return next(error);
  }

  try {
    await comment.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete comment.',
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: 'Deleted post.'
  });
};

exports.getCommentById = getCommentById;
exports.getCommentByPostId = getCommentByPostId;
exports.createComment = createComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
