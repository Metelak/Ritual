const { Schema, model } = require('mongoose');
const challengeSchema = require('./Challenge');
const reflectionSchema = require('./Reflection');
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
      type: String,
      required: 'Please describe your goal!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    },
    isComplete: {
      type: Boolean,
      // currently set to false because when we load the goal we want it to be unchecked
      default: false
    },
    challenges: [challengeSchema],
    reflection: [reflectionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Goal = model('Goal', goalSchema);

module.exports = Goal;
