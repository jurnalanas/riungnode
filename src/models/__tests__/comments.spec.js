const Comment = require('../comments');
import mongoose from 'mongoose';

describe('Comment model', () => {
  describe('schema', () => {
    test('creator', () => {
      const creator = Comment.schema.obj.creator
      expect(creator).toEqual({
        type: String,
        required: true
      })
    })

    test('body', () => {
      const body = Comment.schema.obj.body
      expect(body).toEqual({
        type: String,
        required: true
      })
    })

    test('postId', () => {
      const postId = Comment.schema.obj.postId
      expect(postId).toEqual({
        type: String,
        required: true
      })
    })

    test('date', () => {
      const date = Comment.schema.obj.date
      expect(date).toEqual(Date)
    })

    test('mood', () => {
      const mood = Comment.schema.obj.mood
      expect(mood).toEqual({
        type: String,
        required: false
      })
    })
  })
})
