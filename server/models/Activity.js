const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const activitySchema = new Schema(
  {
    title: {
      type: String
    },
    text: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    },
    image: {
      type: String
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Activity = model('Activity', activitySchema);

module.exports = Activity;
