const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const commentSchema = new Schema({
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
  date: Date
});

module.exports = mongoose.model('Comment', commentSchema);
