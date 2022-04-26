const { Schema, model } = require('mongoose');
// need to create:
// const challengeSchema = require('./Challenge');
// const reflectionSchema = require('./Reflection');
const dateFormat = require('../utils/dateFormat');

const goalSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Please name your goal!',
      minlength: 1,
      maxlength: 280
    },
    description: {
        required: 'Please describe your goal!',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
      },
    // challenges: [challengeSchema],
    // reflection: [reflectionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Goal = model('Goal', goalSchema);

module.exports = Goal;