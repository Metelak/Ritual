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

    activity: async () => {
      return await Activity.find();
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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
        );

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
        );

        return updateUser;
      }

      throw new AuthenticationError('You need to be logged in');
    },
    addGoal: async (parent, args, context) => {
      if (context.user) {
        const goal = await Goal.create({
          ...args
        });

        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { goals: goal._id } },
          { new: true }
        );

        return updateUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeGoal: async (parent, { _id }, context) => {
      if (context.user) {
        const removedGoal = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { goals: _id }
          },
          { new: true }
        );
      }
    },
    addChallenge: async (parent, { goalId, challengeText }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          {
            $push: {
              challenges: { challengeBody, username: context.user.username }
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
              reflections: { reflectionBody, username: context.user.username }
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
