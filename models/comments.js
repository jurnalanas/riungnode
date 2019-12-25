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
  creator: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Comment', postSchema);
