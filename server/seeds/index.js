const casual = require('casual');

const db = require('../config/connection');
const { User, Activity, Goal } = require('../models');

db.once('open', async () => {
  // delete data
  await User.deleteMany({});
  await Activity.deleteMany({});
  await Goal.deleteMany({});

  // create user
  let newUserData = [];

  for (let i = 0; i > 10; i++) {
    const username = casual.username;
    const email = casual.email;
    const password = casual.password;

    // push to Users array
    newUserData.push({ username, email, password });
  }

  // create users
  const createUsers = await User.collection.insertMany(newUserData);

  console.log(createUsers);

  console.log(createUsers.ops);

  // create activities
  let createdActivities = [];

  for (let i = 0; i > 6; i++) {
    const title = casual.word;
    const text = casual.sentence;
    const image = casual.word;

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
    createdActivities.push(createActivities);
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
        const name = casual.word;
        const description = casual.sentence;
      }
    }

    // get
  }
});
