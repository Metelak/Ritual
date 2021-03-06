import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($name: String!, $description: String!) {
    addGoal(name: $name, description: $description) {
      _id
      username
      email
      goals {
        _id
        name
        description
        createdAt
        isComplete
        challenges {
          _id
          challengeText
          createdAt
        }
        reflection {
          _id
          reflectionText
          createdAt
        }
      }
    }
  }
`;

export const ADD_ACTIVITY = gql`
  mutation saveActivity($id: ID!) {
    saveActivity(_id: $id) {
      _id
      username
      email
      activities {
        _id
        title
        text
        image
      }
    }
  }
`;

export const ADD_CHALLENGE = gql`
  mutation AddChallenge($goalId: ID!, $challengeText: String!) {
    addChallenge(goalId: $goalId, challengeText: $challengeText) {
      _id
      name
      description
      createdAt
      isComplete
      challenges {
        _id
        challengeText
        createdAt
      }
      reflection {
        _id
        reflectionText
        createdAt
      }
    }
  }
`;

export const ADD_REFLECTION = gql`
  mutation AddReflection($goalId: ID!, $reflectionText: String!) {
    addReflection(goalId: $goalId, reflectionText: $reflectionText) {
      _id
      name
      description
      createdAt
      isComplete
      reflection {
        _id
        reflectionText
        createdAt
      }
    }
  }
`;

export const COMPLETE_GOAL = gql`
  mutation CompleteGoal($id: ID!) {
    completeGoal(_id: $id) {
      _id
      name
      description
      isComplete
      createdAt
      challenges {
        _id
        challengeText
        createdAt
      }
      reflection {
        _id
        reflectionText
        createdAt
      }
    }
  }
`;

export const REUSE_GOAL = gql`
  mutation reuseGoal($id: ID!) {
    reuseGoal(_id: $id) {
      _id
      isComplete
    }
  }
`;

export const REMOVE_ACTIVITY = gql`
  mutation removeActivity($id: ID!) {
    removeActivity(_id: $id) {
      _id
      username
      email
      activities {
        _id
        title
        text
        image
      }
    }
  }
`;
