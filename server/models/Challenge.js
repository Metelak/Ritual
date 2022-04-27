const { Schema } = require('mongoose');

const challengeSchema = new Schema(
  {
    challengeText: {
      type: String,
      required: 'What have you found challenging today?',
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

// const Challenge = model('Challenge', challengeSchema);

module.exports = challengeSchema;
