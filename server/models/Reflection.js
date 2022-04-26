const { Schema, model } = require('mongoose');

const reflectionSchema = new Schema(
  {
    reflectionText: {
      required:
        'Please share your experience. What have you found rewarding? Enjoyable?',
      minlength: 1,
      maxlength: 280
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

const Reflection = model('Reflection', reflectionSchema);

module.exports = Reflection;
