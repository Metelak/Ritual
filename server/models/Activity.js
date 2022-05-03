const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const activitySubtypeSchema = require('./ActivitySubtypes');

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
    },
    subtypes: [activitySubtypeSchema] 
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Activity = model('Activity', activitySchema);

module.exports = Activity;
