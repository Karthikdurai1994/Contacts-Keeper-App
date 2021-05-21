import React, { useContext, useEffect, useState } from "react";
import allActions from "../../context/actions";
import { GlobalContext } from "../../context/Provider";

const Register = (props) => {
  // Getting actions
  const {
    allAlertActions: { setAlert },
    allAuthActions: { registerUser, clearErrors },
  } = allActions;
  // Getting context api
  const { alertDispatch, authDispatch, authState } = useContext(GlobalContext);
  // Destructuring authState
  const { isAuthenticated, error } = authState;
  // Register Form Values
  const [userRegisterFormValues, setUserRegisterFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
  // Destruturing required vales
  const { name, email, password, confirmPassword } = userRegisterFormValues;
  // form fields onChange
  const onChange = (e) => {
    setUserRegisterFormValues({
      ...userRegisterFormValues,
      [e.target.name]: e.target.value, // e.target.name is placed in square brackets because it denotes that it is set dynamically
    });
  };
  // form submit method
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please Enter All Fields", "danger")(alertDispatch);
    } else if (password !== confirmPassword) {
      setAlert("Password does not match", "danger")(alertDispatch);
    } else {
      registerUser({
        name,
        email,
        password,
      })(authDispatch);
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
