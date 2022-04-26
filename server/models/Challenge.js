const { Schema, model } = require('mongoose');

const challengeSchema = new Schema(
  {
    description: {
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

const Challenge = model('Challenge', challengeSchema);

module.exports = Challenge;