const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);
