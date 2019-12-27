const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);
// TODO: User by Id

router.post('/signup',
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

router.post('/login', usersController.login);

module.exports = router;