const commentsController = require('../comments-controllers');
import { isFunction } from 'lodash';

describe('comments controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getCommentById',
      'getCommentByPostId',
      'createComment',
      'updateComment',
      'deleteComment'
    ]

    crudMethods.forEach(name =>
      expect(isFunction(commentsController[name])).toBe(true)
    )
  })
})
