const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reflectionSchema = new Schema(
  {
    reflectionText: {
      type: String,
      required:
        'Please share your experience. What have you found rewarding? Enjoyable?',
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

// const Reflection = model('Reflection', reflectionSchema);

module.exports = reflectionSchema;
