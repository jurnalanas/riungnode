const express = require('express');
const { check } = require('express-validator');

const postsControllers = require('../controllers/posts-controllers');

const router = express.Router();

router
  .route('/')
  .get(postsControllers.getPosts)
  .post(
    [
      check("title")
        .not()
        .isEmpty(),
      check("body").isLength({ min: 10 }),
      check("date")
        .not()
        .isEmpty(),
      check("creator")
        .not()
        .isEmpty()
    ],
    postsControllers.createPost
  );


router
  .route('/:pid')
  .get(postsControllers.getPostById)
  .delete(postsControllers.deletePost)
  .patch(
    [
      check("title")
        .not()
        .isEmpty(),
      check("body").isLength({ min: 10 })
    ],
    postsControllers.updatePost
  );

router
  .route('/user/:uid')
  .get(postsControllers.getPostByUserId)

module.exports = router;
