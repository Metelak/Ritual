import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
  mutation addGoal($id: ID!) {
    addGoal(GoalId: $id) {
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

export const ADD_ACTIVITY = gql`
  mutation addActivity($id: ID!) {
    addActivity(addActivity: $id) {
      _id
      name
      description
      image
      link
    }
  }
`;

export const ADD_CHALLENGE = gql`
  mutation addChallenge($id: ID!) {
    addChallenge(addChallenge: $id) {
        _id
        challengeText
        createdAt
    }
  }
`;

// export const ADD_REFLECTION = gql`
//   mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
//     addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
//       _id
//       reactionCount
//       reactions {
//         _id
//         reactionBody
//         createdAt
//         username
//       }
//     }
//   }
// `;

// export const REMOVE_GOAL = gql`
//   mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
//     addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
//       _id
//       reactionCount
//       reactions {
//         _id
//         reactionBody
//         createdAt
//         username
//       }
//     }
//   }
// `;

// export const REMOVE_ACTIVITY = gql`
//   mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
//     addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
//       _id
//       reactionCount
//       reactions {
//         _id
//         reactionBody
//         createdAt
//         username
//       }
//     }
//   }
// `;
