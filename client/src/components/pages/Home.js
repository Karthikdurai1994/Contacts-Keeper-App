import React, { useContext, useEffect } from "react";
import allActions from "../../context/actions";
import { GlobalContext } from "../../context/Provider";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";
import FilterContacts from "../contacts/FilterContacts";
const About = () => {
  // Getting context api
  const { authDispatch } = useContext(GlobalContext);
  // Getting auth actions
  const {
    allAuthActions: { loadUser },
  } = allActions;
  // using useEffect for the first when component loaded or refreshed so that we will call loaduser action in order to save user details in our state and it will not be lost or deleted
  useEffect(() => {
    loadUser()(authDispatch);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <FilterContacts />
        <Contacts />
      </div>
    </div>
  );
};

export default About;
