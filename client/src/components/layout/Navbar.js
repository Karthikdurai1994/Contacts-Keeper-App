import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/Provider";
import PropTypes from "prop-types";
import allActions from "../../context/actions";

const Navbar = ({ title, icon }) => {
  // Getting context api
  const { authState, authDispatch } = useContext(GlobalContext);
  // Getting actions
  const {
    allAuthActions: { logoutUser },
  } = allActions;
  // destructuring authState
  const { isAuthenticated, user } = authState;
  // onLogout function
  const onLogout = () => {
    logoutUser()(authDispatch);
  };
  // authLinks will appear after successful login or register
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="/">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  // guestLinks will appear before login or register that is guestLink will appear in login and register page
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  // UI
  return (
    <div className="navbar bg-primary">
      <h2>
        <i className={icon} /> {title}
      </h2>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

// Setting type of data will be in props
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

// Setting default prop types
Navbar.defaultProps = {
  title: "Contacts Keeper",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
