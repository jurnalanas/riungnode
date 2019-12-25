const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [{
  id: 'u1',
  name: 'Max Schwarz',
  username: 'username1',
  password: 'testers'
}];

const getUsers = (req, res, next) => {
  res.json({
    users: DUMMY_USERS
  });
};

const signup = (req, res, next) => {
  const {
    name,
    username,
    password
  } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.username === username);
  if (hasUser) {
    throw new HttpError('Could not create user, username already exists.', 422);
  }

  const createdUser = {
    id: uuid(),
    name,
    username,
    password
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({
    user: createdUser
  });
};

const login = (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.username === username);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
  }

  res.json({
    message: 'Logged in!'
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
