// import data
const userData = require('./userData');
const activityData = require('./activityData');
const goalData = require('./goalsData');
const { reflectionData, challengeData } = require('./reflectionsAndChallenges');

const db = require('../config/connection');
const { User, Activity, Goal } = require('../models');
const Challenge = require('../models/Challenge');
const Reflection = require('../models/Reflection');

const getIds = (array) => {
  const idArray = [];
  for (let i = 0; i < array.length; i++) {
    let id = array[i]._id;
    idArray.push(id);
  }

  return idArray;
};

db.once('open', async () => {
  // delete data
  await User.deleteMany({});
  await Activity.deleteMany({});
  await Goal.deleteMany({});
  await Challenge.deleteMany({});
  await Reflection.deleteMany({});

  console.log('Deleted existing db data');

  // create users and get ids
  const createUsers = await User.insertMany(userData);
  const newUserIds = getIds(createUsers);

  console.log('Created Users');

  // add activities
  const createActivities = await Activity.insertMany(activityData);
  const newActivityIds = getIds(createActivities);

  console.log('Created Activities');

  // give each user a random activity
  newUserIds.forEach(async (userId) => {
    // generate random activity
    const randomNum = Math.floor(Math.random() * (newActivityIds.length - 1));

    const activity = newActivityIds[randomNum];

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { activities: activity }
      }
    );
  });

  console.log('Added Activities to Users');

  // add goals to db
  const newGoals = await Goal.insertMany(goalData);
  const newGoalIds = getIds(newGoals);

  console.log('Created Goals');

  // add challenges to db
  const newChallenges = await Challenge.insertMany(challengeData);
  const newChallengeIds = getIds(newChallenges);

  console.log('Created Challenges');

  // add reflections to db
  const newReflections = await Reflection.insertMany(reflectionData);
  const newReflectionIds = getIds(newReflections);

  console.log('Created Reflections');

  // add challenges to goals
  newChallengeIds.forEach(async (challengeId) => {
    let index = Math.floor(Math.random() * (newGoalIds.length - 1));

    await Goal.findOneAndUpdate(
      {
        _id: newGoalIds[index]
      },
      { $push: { challenges: challengeId } }
    );
  });

  // add reflections to goals
  newReflectionIds.forEach(async (reflectionId) => {
    let index = Math.floor(Math.random() * (newGoalIds.length - 1));

    await Goal.findOneAndUpdate(
      {
        _id: newGoalIds[index]
      },
      { $push: { reflection: reflectionId } }
    );
  });

  // add goals to random users;
  newGoalIds.forEach(async (goal) => {
    // get random user id
    let index = Math.floor(Math.random() * 9);

    await User.findOneAndUpdate(
      {
        _id: newUserIds[index]
      },
      {
        $push: { goals: goal }
      }
    );
  });

  console.log('Database seeded');
  process.exit(0);
});
