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
    title: String
    text: String
    image: String
  }

  type Goal {
    _id: ID
    name: String
    description: String
    createdAt: String
    isComplete: Boolean
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
    user(username: String!): User
    goals: [Goal]
    goal(_id: ID!): Goal
    activities: [Activity]
    activity(_id: ID!): Activity
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveActivity(_id: ID!): User
    removeActivity(_id: ID!): User
    addGoal(name: String!, description: String!): Goal
    completeGoal(_id: ID!): Goal
    addChallenge(goalId: ID!, challengeText: String!): Goal
    addReflection(goalId: ID!, reflectionText: String!): Goal
  }
`;

module.exports = typeDefs;
