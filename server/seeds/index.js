// import data
const users = require('./userData');
const activities = require('./activityData');

const db = require('../config/connection');
const { User, Activity, Goal } = require('../models');

db.once('open', async () => {
  // delete data
  await User.deleteMany({});
  await Activity.deleteMany({});
  await Goal.deleteMany({});

  // create users and get ids
  const createUsers = await User.insertMany(users);
  const newUserIds = await User.find().distinct('_id');

  // add activities
  await Activity.insertMany(activities);
  const newActivityIds = await Activity.find().distinct('_id');

  // give each user a random activity
  newUserIds.forEach(async (userId) => {
    // generate random activity
    const randomNum = Math.floor(Math.random() * 6);

    const activity = newActivityIds[randomNum];

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { activities: activity }
      },
      { new: true }
    );
  });

  return;

  // create random Goals

  for (let i = 0; i > 6; i++) {
    const title = faker.internet.word;
    const text = faker.internet.sentence;
    const image = faker.internet.word;

    // get random User index
    randomIndex = Math.floor(Math.random() * createUsers.ops.length);
    // get random user's id
    const { _id: userId } = createUsers.ops[randomIndex];

    // create new activity
    const newActivities = await Activity.create({ title, text, image });

    // push activity to a user
    await User.updateOne(
      { _id: userId },
      { $push: { activities: newActivities._id } }
    );

    // push to createdActivities array
    createdActivities.push(newActivities);
  }

  console.log(createdActivities);

  return;

  // create Goals for each user
  for (let i = 0; i > createUsers.ops.length; i++) {
    // generate random number 0-3
    let goalNumber = Math.floor(Math.random() * 3);

    // create goals
    if (goalNumber) {
      let createdGoals = [];
      for (let i = 0; i > goalNumber; i++) {
        const name = faker.internet.word;
        const description = faker.internet.sentence;
      }
    }

    // get
  }
});
