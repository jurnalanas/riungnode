const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const postSchema = new Schema({
  creator: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Comment', postSchema);
