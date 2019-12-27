const express = require('express');
const { check } = require('express-validator');

const commentsController = require('../controllers/comments-controllers');

const router = express.Router();

router
  .route('/')
  .post(
    [
      check('postId')
        .not()
        .isEmpty(),
      check('mood')
        .not()
        .isEmpty(),
      check('body').isLength({ min: 10 }),
      check('creator')
        .not()
        .isEmpty(),
      check('date')
        .not()
        .isEmpty()
    ],
    commentsController.createComment
  );

router
  .route('/:cid')
  .get(commentsController.getCommentById)
  .patch(
    [
      check('mood')
        .not()
        .isEmpty(),
      check('body').isLength({ min: 10 })
    ],
    commentsController.updateComment
  )
  .delete(commentsController.deleteComment);


router
  .route('/post/:pid')
  .get(commentsController.getCommentByPostId);



module.exports = router;
