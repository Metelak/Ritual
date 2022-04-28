const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const challengeSchema = new Schema(
  {
    challengeText: {
      type: String,
      required: 'What have you found challenging today?',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

// const Challenge = model('Challenge', challengeSchema);

module.exports = challengeSchema;
