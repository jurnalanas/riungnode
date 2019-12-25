const uuid = require('uuid/v4');
const {
  validationResult
} = require('express-validator');

const HttpError = require('../models/http-error');
const Comment = require('../models/comments');

let DUMMY_COMMENTS = [{
    creator: "user1",
    id: 'comment1',
    postId: 'post1',
    created_at: new Date("12/12/2019").toDateString(),
    body: 'this is a very insightful commnet',
    mood: 'thumbs',
  },
  {
    creator: "user1",
    id: 'comment2',
    postId: 'post1',
    created_at: new Date("12/12/2019").toDateString(),
    body: 'this is a very insightful commnet2',
    mood: 'thumbs',
  }
]
const getCommentById = (req, res, next) => {
  const commentId = req.params.cid;

  const comments = DUMMY_COMMENTS.find(c => {
    return c.id === commentId;
  });

  if (!comments || comments.length === 0) {
    throw new HttpError('Could not find a comment for the provided id.', 404);
  }

  res.json({
    comments
  });
};


const getCommentByPostId = (req, res, next) => {
  const postId = req.params.pid;

  const comments = DUMMY_COMMENTS.find(c => {
    return c.postId === postId;
  });

  if (!comments || comments.length === 0) {
    return next(
      new HttpError('Could not find a post for the provided user id.', 404)
    );
  }

  res.json({
    comments
  });
};

const createComment = async (req, res, next) => {
  const errors = validationResult(req);
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

const updateComment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const {
    body,
    mood
  } = req.body;
  const commentId = req.params.pid;

  const updatedComment = {
    ...DUMMY_COMMENTS.find(c => c.id === commentId)
  };
  const postIndex = DUMMY_COMMENTS.findIndex(c => c.id === commentId);
  updatedComment.body = body;
  updatedComment.mood = mood;
  DUMMY_COMMENTS[postIndex] = updatedComment;

  res.status(200).json({
    comment: updatedComment
  });
};

const deleteComment = (req, res, next) => {
  const commentId = req.params.pid;
  if (!DUMMY_COMMENTS.find(c => c.id === commentId)) {
    throw new HttpError('Could not find a post for that id.', 404);
  }
  DUMMY_COMMENTS = DUMMY_COMMENTS.filter(c => c.id !== commentId);
  res.status(200).json({
    message: 'Deleted post.'
  });
};

exports.getCommentById = getCommentById;
exports.getCommentByPostId = getCommentByPostId;
exports.createComment = createComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
