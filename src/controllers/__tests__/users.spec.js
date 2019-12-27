const usersControllers = require('../users-controllers');
import { isFunction } from 'lodash';

describe('users controllers', () => {
  test('has auth functionality controllers', () => {
    const crudMethods = [
      'getUsers',
      'signup',
      'login'
    ]

    crudMethods.forEach(name =>
      expect(isFunction(usersControllers[name])).toBe(true)
    )
  })
})
