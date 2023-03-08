const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  created: {
    type: Number,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  },
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
  isSent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Message', messageSchema);
