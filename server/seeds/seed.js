// import data
const {
  activities,
  challenges,
  goals,
  reflections,
  users
} = require('./seed-data');

// connect to db
const db = require('../config/connection');
const { User, Activity, Goal } = require('../models');

// returns array of just the newly generated ids
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
  const createUsers = await User.insertMany(users);
  const newUserIds = getIds(createUsers);

  console.log('Created Users');

  // add activities
  const createActivities = await Activity.insertMany(activities);
  const newActivityIds = getIds(createActivities);

  console.log('Created Activities');

  // give each user a random activity

  for await (const userId of newUserIds) {
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
  const newGoals = await Goal.insertMany(goals);
  const newGoalIds = getIds(newGoals);

  console.log('Created Goals');

  // add challenges to goals
  for await (const data of challenges) {
    let index = Math.floor(Math.random() * (newGoalIds.length - 1));

    await Goal.findOneAndUpdate(
      {
        _id: newGoalIds[index]
      },
      { $push: { challenges: data } }
    );
  }

  console.log('challenges added');

  // add reflections to goals
  for await (const data of reflections) {
    let index = Math.floor(Math.random() * (newGoalIds.length - 1));

    await Goal.findOneAndUpdate(
      {
        _id: newGoalIds[index]
      },
      { $push: { reflection: data } }
    );
  }

  // add goals to random users;
  for await (const goal of newGoalIds) {
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
