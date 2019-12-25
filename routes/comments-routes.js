const express = require('express');
const { check } = require('express-validator');

const commentsController = require('../controllers/comments-controllers');

const router = express.Router();


router.get('/:cid', commentsController.getCommentById);

router.get('/post/:pid', commentsController.getCommentByPostId);

router.post('/',
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

router.patch('/:pid',
  [
    check('mood')
      .not()
      .isEmpty(),
    check('body').isLength({ min: 10 })
  ],
  commentsController.updateComment
);

router.delete('/:pid', commentsController.deleteComment);

module.exports = router;
