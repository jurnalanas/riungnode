const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router
  .route('/')
  .get(usersController.getUsers)

// TODO: User by Id
router
  .route('/signup')
  .post(
    [
      check('name')
        .not()
        .isEmpty(),
      check('username')
        .not()
        .isEmpty(),
      check('password').isLength({ min: 6 })
    ],
    usersController.signup
  );

router
  .route('/login')
  .post(usersController.login);

module.exports = router;
