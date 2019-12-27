const Post = require('../post');
import mongoose from 'mongoose';

describe('Post model', () => {
  describe('schema', () => {
    test('title', () => {
      const title = Post.schema.obj.title
      expect(title).toEqual({
        type: String,
        required: true
      })
    })

    test('body', () => {
      const body = Post.schema.obj.body
      expect(body).toEqual({
        type: String,
        required: true
      })
    })

    test('image', () => {
      const image = Post.schema.obj.image
      expect(image).toEqual({
        type: String,
        required: false
      })
    })

    test('date', () => {
      const date = Post.schema.obj.date
      expect(date).toEqual(Date)
    })

    test('creator', () => {
      const creator = Post.schema.obj.creator
      expect(creator).toEqual({
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      })
    })
  })
})
