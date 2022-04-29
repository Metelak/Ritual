// import data
const userData = require('./userData');
const activityData = require('./activityData');
const goalData = require('./goalsData');
const { reflectionData, challengeData } = require('./reflectionsAndChallenges');

const db = require('../config/connection');
const { User, Activity, Goal } = require('../models');

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

  newUserIds.forEach((userId) => {});

  for (const userId of newUserIds) {
    // generate random activity
    const randomNum = Math.floor(Math.random() * (newActivityIds.length - 1));

    const activity = newActivityIds[randomNum];

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { activities: activity }
      }
    );
  }

  console.log('Added Activities to Users');

  // add goals to db
  const newGoals = await Goal.insertMany(goalData);
  const newGoalIds = getIds(newGoals);

  console.log('Created Goals');

  // add challenges to goals
  for (const challengeText of challengeData) {
    let index = Math.floor(Math.random() * (newGoalIds.length - 1));

    let text = challengeText.challengeText;

    console.log(text);

    return await Goal.findOneAndUpdate(
      {
        _id: newGoalIds[index]
      },
      { $push: { challenges: { text } } }
    );
  }

  console.log('challenges added');

  // add reflections to goals
  for (const reflectionText of reflectionData) {
    let index = Math.floor(Math.random() * (newGoalIds.length - 1));

    await Goal.findOneAndUpdate(
      {
        _id: newGoalIds[index]
      },
      { $push: { reflection: { reflectionText } } }
    );
  }

  // add goals to random users;
  for (const goal of newGoalIds) {
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
  }

  console.log('Database seeded');
  process.exit(0);
});
