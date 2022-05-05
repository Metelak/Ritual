import React, { createContext, useContext } from 'react';
// import reducer
import { useUserReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

export const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useUserReducer({
    goals: [],
    activities: []
  });

  console.log(state);
  return <Provider value={[state, dispatch]} {...props}></Provider>;
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
