const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  variation: {
    type: String,
    required: true,
  },
});

const optionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const treeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  options: {
    type: [optionSchema],
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
});

const configSchema = new Schema({
  mail: {
    template: {
      type: String,
      required: false,
    },
    footer: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
  appointments: {
    type: [appointmentSchema],
    required: false,
  },
  tree: {
    type: [treeSchema],
    required: false,
  },
});

// This middleware on pre-save checks if config document exists
configSchema.pre('save', async function () {
  try {
    const count = await this.constructor.countDocuments({});
    if (count > 0) {
      throw new Error('Cannot add more than one configuration object');
    }
  } catch (err) {
    throw err;
  }
});

module.exports = mongoose.model('Config', configSchema);
