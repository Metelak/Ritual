# **Ritual**  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 A goal setting application centered on wellness, where users can add new goals, track daily goals, and monitor progress.


## **Table of Contents**

  * [User-Story](#user-story)
  * [Description](#description)
  * [Preview](#preview)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Packages](#packages)
  * [Other Tools](#other-tools)
  * [Future Developments](#future-developments)
  * [Contributions](#contributions)
  * [Tests](#tests)
  * [License](#license)
  * [Questions](#questions)


  ## **User-Story**
  AS A user I want an application that provides wellness activities and tracks my wellness goals
  SO THAT I can draw inspiration of new ideas, and evaluate whether or not I am reaching my goals
  WHEN goals are missed, I have the opportunity to start again!

  ## **Description**
 We want to create a goal setting application centered on wellness, where we can add new goals, track daily goals, and monitor progress.

Display homepage. If you are not a “USER” you can see all the suggested activities. When you click on one, it will ask you to log in to save the activity to your daily goals. This is our way to get people to create an account / interact with the app!

Once users are signed up / logged in, users can save activities from the homepage, and view their wellness dashboard where they can add custom goals, or review saved activities. Users can add custom notes, whether challenges they've had completing their goals, or reflections on the experience. Once a goal is accomplished, the user can mark it as complete. 

Completed goals can be reviewed and also added back on to the active dashboard should a user wish to reuse a goal.


  ## **Preview**
  ## Homepage
  ![readme](https://user-images.githubusercontent.com/94068596/166850383-35f702bc-68ae-4def-9836-e1a993e61a5e.png)
  ## User Dashboard
![readme1](https://user-images.githubusercontent.com/94068596/166850396-89746ca0-df2a-41b7-af8b-e69018c5fac8.png)

## Mobile Homepage and Dashboard

![ritual_mobile_homepage](https://user-images.githubusercontent.com/82235272/166951140-b602591b-b007-4d2a-b207-fb22d456ba85.png) ![ritual_mobile_dashboard](https://user-images.githubusercontent.com/82235272/166951858-d7965193-ef46-49c5-b84b-5f1074ac0822.png)


  ## **Installation**
  From GitHub, download a copy of our application by clicking the `clone` button on the top right. From there you can choose a .zip file, which will need to be extracted, or clone by HTTPS, SSH, or GitHub Cli. You can also open with GitHub Desktop application. After the files are on your local device, open the project folder in an editor like VSC. Using the command terminal from the root directory of the application run `npm i` to install all the required packages, followed by `npm run seed` to seed the database with fake data for testing, and then `npm run develop` to view live in your browser.

  ## **Usage**
  * To run the server locally after installation in the root of the project Run
      ```
      npm run develop
     ```
  * Or visit our webpage [Ritual](https://ritual-app-01.herokuapp.com/)


## **Packages**
* [Apollo](https://www.apollographql.com/docs/apollo-server/)
* [Heroku](https://id.heroku.com/login)
* [Graph QL](https://graphql.org/)
* [React](https://reactjs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Chakra UI](https://chakra-ui.com/)


## **Other Tools**
* [Canva](https://www.canva.com/) provides templates and icons for styling flyers and websites; we used for our Ritual logo.
* [Pixlr](https://pixlr.com/x/) an Open Source software, which we used to edit and resize our logo and photos from the internet for our activities. 


## **Future Developments**
* Create goals by frequency (days, weekly, etc)
* Track how often the users are completing the same goals
* Add Stripe to allow users to make donations towards a cause (Mental Health)
* Welcome Page / Tutorial for new users
 

## **Contributions**
Group collaborators:
* [Metelak](https://github.com/Metelak)
* [mimi5930](https://github.com/mimi5930)
* [crosenfrisk](https://github.com/crosenfrisk)

## **Tests**

**Front End Tests:**

On the website, try logging in without creating an account; you should receive an error:

`We could not validate your account.
Please re-enter your credentials, or sign up to create a new account.`

If you try to save an activity without an account, you will receive an error:

`Not logged in!
Please log in to save this activity`

After creating an account, you should be able to log in using your credentials. 

Once logged in, you may save activities to your dashboard. From your dashboard, you may also try adding new goals, challenges, reflections. Each of these operations requires users to complete all of the fields before saving / submitting. Errors will populate on the modals prompting the user to complete their goal, challenge, or reflection before saving.

Saved goals can be marked completed, and will automatically be moved to the "completed page" where they can be viewed later, or restored to the active dashboard.

**Back End tests:**

After cloning the repository and running npm i, npm run seed, and npm start from the /server directory, you can open Apollo in the browser and test mutations and queries based on the models and schema in /server


## **License** 
The MIT License (MIT)
Copyright © 2022 <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  

## **Questions**

If any questions arise...

* Visit my Github at: [https://github.com/Metelak](https://github.com/Metelak) or contact any of the app collaborators, GitHub accounts listed above.