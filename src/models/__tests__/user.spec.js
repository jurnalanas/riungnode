const User = require('../user');
import mongoose from 'mongoose';

describe('User model', () => {
  describe('schema', () => {
    test('name', () => {
      const name = User.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true
      })
    })

    test('username', () => {
      const username = User.schema.obj.username
      expect(username).toEqual({
        type: String,
        required: true,
        unique: true
      })
    })

    test('password', () => {
      const password = User.schema.obj.password
      expect(password).toEqual({
        type: String,
        required: true,
        minlength: 6
      })
    })

    test('posts', () => {
      const posts = User.schema.obj.posts
      expect(posts).toEqual([{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Post'
      }])
    })
  })
})
