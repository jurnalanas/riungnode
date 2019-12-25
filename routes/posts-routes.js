const express = require('express');
const { check } = require('express-validator');

const postsControllers = require('../controllers/posts-controllers');

const router = express.Router();


router.get('/:pid', postsControllers.getPostById);

router.get('/user/:uid', postsControllers.getPostByUserId);

router.post('/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('body').isLength({ min: 10 }),
    check('date')
      .not()
      .isEmpty()
  ],
  postsControllers.createPost
);

router.patch('/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('body').isLength({ min: 10 })
  ],
  postsControllers.updatePost
);

router.delete('/:pid', postsControllers.deletePost);

module.exports = router;
