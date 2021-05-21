import React, { useContext } from "react";
import { GlobalContext } from "../../context/Provider";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Getting context api
  const { authState } = useContext(GlobalContext);
  // Destructuring authState
  console.log(authState);
  const { isAuthenticated, loading } = authState;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
