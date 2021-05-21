import React, { useContext, useState, useEffect } from "react";
import allActions from "../../context/actions";
import { GlobalContext } from "../../context/Provider";
const Login = (props) => {
  // Getting actions
  const {
    allAuthActions: { loginUser, clearErrors },
    allAlertActions: { setAlert },
  } = allActions;
  // Getting Context API
  const { authState, authDispatch, alertDispatch } = useContext(GlobalContext);
  // Destructuring authState
  const { error, isAuthenticated } = authState;
  // using useEffect hook to check if errors is present in authState or not
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error !== null) {
      setAlert(error, "danger")(alertDispatch);
      clearErrors()(authDispatch);
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated]);
  // Register Form Values
  const [userLoginFormValues, setUserLoginFormValues] = useState({
    email: "",
    password: "",
  });
  // Destruturing required vales
  const { email, password } = userLoginFormValues;
  // form fields onChange
  const onChange = (e) => {
    setUserLoginFormValues({
      ...userLoginFormValues,
      [e.target.name]: e.target.value, // e.target.name is placed in square brackets because it denotes that it is set dynamically
    });
  };
  // form submit method
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please Enter All Fields...", "danger")(alertDispatch);
    } else {
      loginUser({ email, password })(authDispatch);
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
