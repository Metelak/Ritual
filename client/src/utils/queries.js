import { gql } from '@apollo/client';

// execute user query referencing all of the user's information, 
// goals and saved activities from their dashboard
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
    _id
    username
    email
    activities {
        _id
        name
        description
        image
        link
    }
    goals {
        _id
        name
        description
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

// This will execute the 'me' query 
// set up using Apollo Server in typeDefs.js.
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      activities {
        _id
        name
        description
        image
        link
      }
      goals {
        _id
        name
        description
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

// Execute activity list for dashboard
export const QUERY_ACTIVITIES = gql`
  query activities($name: String) {
    activity(name: $name) {
      _id
      name
      description
      image
      link
    }
  }
`;

// query user goals for dashboard
export const QUERY_USER_GOALS = gql `
query userGoals($username: username, $goals: goals){
    userGoals(username: $username, goals: $goals){
        _id
        username
        goals  {
            _id
            name
            description
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
}`

// query user activities for dashboard
export const QUERY_USER_ACTIVITIES = gql `
query userActivities($username: username, $activities: activities){
    userActivities(username: $username, activities: $activities){
        _id
        username
        activities {
            _id
            name
            description
            image
            link
        }
    }
}`

// query user challenges from goals for dashboard
export const QUERY_USER_CHALLENGES = gql `
query userChallenges($username: username, $goals: goals, $challenges: challenges){
    userChallenges(username: $username, goals: $goals, challenges: $challenges){
        _id
        username
        goals  {
            _id
            name
            description
            createdAt
            challenges {
                _id
                challengeText
                createdAt
            }
        }
    }
}`

// query user reflection from goals for dashboard
export const QUERY_USER_REFLECTIONS = gql `
query userReflections($username: username, $goals: goals, $reflections: reflection){
    userReflections(username: $username, goals: $goals, reflection: $reflections){
        _id
        username
        goals  {
            _id
            name
            description
            createdAt
            reflection {
                _id
                reflectionText
                createdAt
            }
        }
    }
}`