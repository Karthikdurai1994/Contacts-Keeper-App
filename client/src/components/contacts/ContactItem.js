import React, { useContext } from "react";
import { GlobalContext } from "../../context/Provider";
import PropTypes from "prop-types";
import allActions from "../../context/actions";
const ContactItem = ({ contact }) => {
  // Getting Context API
  const { contactDispatch } = useContext(GlobalContext);
  // Getting contact action from all action
  const {
    allContactsActions: {
      deleteContact,
      setCurrentContact,
      clearCurrentContact,
    },
  } = allActions;
  // Destructuring contact props
  const { _id, name, email, phone, type } = contact;
  // Deleting Contact
  const deleteContactFun = () => {
    deleteContact(_id)(contactDispatch);
    clearCurrentContact()(contactDispatch);
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " + (type === "Personal" ? "badge-primary" : "badge-success")
          }
        >
          {type}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => {
            setCurrentContact(contact)(contactDispatch);
          }}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={deleteContactFun}>
          Delete
        </button>
      </p>
    </div>
  );
};

// Setting up Prop Types
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
