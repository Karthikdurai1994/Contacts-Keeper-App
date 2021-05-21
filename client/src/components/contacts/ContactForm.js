import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/Provider";
import allActions from "../../context/actions";
const ContactForm = () => {
  // Getting Context
  const { contactDispatch, contactState } = useContext(GlobalContext);
  // Destructuring contactState
  const { current } = contactState;
  useEffect(() => {
    if (current !== null) {
      setContactFormValues(current);
    } else {
      setContactFormValues({
        name: "",
        phone: "",
        email: "",
        type: "Personal",
      });
    }
  }, [current]);
  // Getting Actions
  const {
    allContactsActions: { addContact, clearCurrentContact, updateContact },
  } = allActions;
  const [contactFormValues, setContactFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    type: "Personal",
  });
  const { name, phone, email, type } = contactFormValues;
  const onChangeFormValue = (e) => {
    setContactFormValues({
      ...contactFormValues,
      [e.target.name]: e.target.value, // Here square brackets is used to for setting objrct, because it indicates that object key or object property name has been set dynamically.
    });
  };

  // Form Submission
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contactFormValues)(contactDispatch);
    } else {
      updateContact(contactFormValues)(contactDispatch);
    }

    setContactFormValues({
      name: "",
      phone: "",
      email: "",
      type: "Personal",
    });
  };

  // Clearing Contact
  const clearContact = () => {
    clearCurrentContact()(contactDispatch);
  };

  // UI
  return (
    <form onSubmit={onFormSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChangeFormValue}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChangeFormValue}
      />
      <input
        type="text"
        placeholder="phone"
        name="phone"
        value={phone}
        onChange={onChangeFormValue}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="Personal"
        onChange={onChangeFormValue}
        checked={type === "Personal"}
      />{" "}
      Personal &nbsp;
      <input
        type="radio"
        name="type"
        value="Professional"
        onChange={onChangeFormValue}
        checked={type === "Professional"}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <button className="btn btn-light btn-block" onClick={clearContact}>
          Clear
        </button>
      )}
    </form>
  );
};

export default ContactForm;
