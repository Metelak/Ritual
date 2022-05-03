import { useReducer } from 'react';
import { ADD_GOALS, ADD_ACTIVITIES } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_GOALS:
      return {
        ...state,
        goals: [...action.goals]
      };

    case ADD_ACTIVITIES:
      return {
        ...state,
        activities: [...action.activities]
      };
    default:
      return state;
  }
};

export function useUserReducer(initialState) {
  return useReducer(reducer, initialState);
}
