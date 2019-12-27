const postsControllers = require('../posts-controllers');
import { isFunction } from 'lodash';

describe('posts controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getPostById',
      'getPostByUserId',
      'createPost',
      'updatePost',
      'deletePost',
      'getPosts'
    ]

    crudMethods.forEach(name =>
      expect(isFunction(postsControllers[name])).toBe(true)
    )
  })
})
