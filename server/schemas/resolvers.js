const { AuthenticationError } = require('apollo-server-express');
const { User, Goal, Activity, Reflection, Challenge } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('goals')
          .populate('activities');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username })
        .select('-__v -password')
        .populate('goals')
        .populate('activities');
    },
    goals: async () => {
      return await Goal.find({}).populate('challenges').populate('reflection');
    },
    goal: async (parent, { _id }) => {
      return await Goal.findOne({ _id })
        .populate('challenges')
        .populate('reflection');
    },
    activities: async () => {
      return await Activity.find({});
    },
    activity: async (parent, { _id }) => {
      return await Activity.findOne({ _id: _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveActivity: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { activities: _id } },
          { new: true, runValidators: true }
        )
          .populate('activities')
          .populate('goals');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in');
    },
    // added removeActivity
    removeActivity: async (parent, { _id }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          {
            _id: context.user._id
          },
          { $pull: { activities: _id } },
          {
            new: true
          }
        ).populate('activities');

        return updateUser;
      }

      throw new AuthenticationError('You need to be logged in');
    },
    addGoal: async (parent, args, context) => {
      if (context.user) {
        const goal = await Goal.create({
          ...args
        });

        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { goals: goal._id } },
          { new: true }
        ).populate({
          path: 'goals',
          populate: [
            {
              path: 'challenges'
            },
            { path: 'reflection' }
          ]
        });

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    completeGoal: async (parent, { _id }, context) => {
      if (context.user) {
        // find User's goal and update boolean on isComplete
        const completedGoal = await Goal.findOneAndUpdate(
          { _id: _id },
          { isComplete: true },
          { new: true }
        );

        return completedGoal;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    reuseGoal: async (parent, { _id }, context) => {
      if (context.user) {
        // find User's goal and update boolean on isComplete
        const completedGoal = await Goal.findOneAndUpdate(
          { _id: _id },
          { isComplete: false },
          { new: true }
        )
          .populate('challenges')
          .populate('reflection');

        return completedGoal;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addChallenge: async (parent, { goalId, challengeText }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          {
            $push: {
              challenges: { challengeText }
            }
          },
          { new: true, runValidators: true }
        );

        return updatedGoal;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addReflection: async (parent, { goalId, reflectionText }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          {
            $push: {
              reflection: { reflectionText }
            }
          },
          { new: true, runValidators: true }
        );

        return updatedGoal;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
