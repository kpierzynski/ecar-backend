const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');

const messageSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  whenSend: {
    type: Number,
    required: true,
  },
  template: {
    type: Number,
    required: false,
  },
  isSent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Message', messageSchema);
