import React, {createContext, useReducer} from 'react';

const GlobalContext = createContext({});
// Creating Global State
const [authState, authDispatch] = useReducer(authReducer, {});
const GlobalProvider = ({children}) => {
  return <GlobalContext.Provider value={[]}>{children}</GlobalContext.Provider>;
};
