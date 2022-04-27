const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    activities: [Activity]
    goals: [Goal]
  }

  type Activity {
    _id: ID
    name: String
    description: String
    image: String
    link: String
  }

  type Goal {
    _id: ID
    name: String
    description: String
    createdAt: String
    challenges: [Challenge]
    reflection: [Reflection]
  }

  type Challenge {
    _id: ID
    challengeText: String
    createdAt: String
  }

  type Reflection {
    _id: ID
    reflectionText: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addActivity(
        activityId: String!,
        name: String!,
        activityText: String!,
        image: String!,
        link: String!
    ): Auth
    removeActivity(
        activityId: String!
    ): Auth
    addGoal(
        goalId: String!,
        name: String!,
        description: String!,
        createdAt: String!
    ): Goal
    removeGoal(
        goalId: String!
    ): Goal
    addChallenge(goalId: ID!, challengeText: String!): Goal
    addReflection(goalId: ID!, reflectionText: String!): Goal
  }
`;

module.exports = typeDefs;