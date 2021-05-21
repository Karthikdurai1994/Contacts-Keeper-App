import React, { createContext, useReducer } from "react";
import allInitials from "./initialState";
import allReducers from "./reducers";

export const GlobalContext = createContext();

const GlobalProvider = (props) => {
  // Getting initialState from allInitials
  const { contactInitial, authInitial, alertInitial } = allInitials;
  // Getting reducer from allReducers
  const { contactReducer, authReducer, alertReducer } = allReducers;
  // useReducer hook for contacts
  const [contactState, contactDispatch] = useReducer(
    contactReducer,
    contactInitial
  );
  // useReducer hook for auth
  const [authState, authDispatch] = useReducer(authReducer, authInitial);
  // useReducer hook for alert
  const [alertState, alertDispatch] = useReducer(alertReducer, alertInitial);
  return (
    <GlobalContext.Provider
      value={{
        contactState,
        contactDispatch,
        authState,
        authDispatch,
        alertState,
        alertDispatch,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
