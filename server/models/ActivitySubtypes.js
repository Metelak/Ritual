const { Schema } = require('mongoose');

const activitySubtypeSchema = new Schema(
  {
    subtypeTitle: {
      type: String
    },
    subtypeDescription: {
        type: String
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = activitySubtypeSchema;
