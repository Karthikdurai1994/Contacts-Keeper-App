import React, { Fragment, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/Provider";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";
import allActions from "../../context/actions";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  // Using Context in order to get state and dispatch functions
  const { contactState, contactDispatch } = useContext(GlobalContext);
  // Getting actions
  const {
    allContactsActions: { getContacts },
  } = allActions;
  // Destructuring Required Data from contactState
  const { contacts, filtered, loading } = contactState;
  // using useEffect for fetching contacts from api when the component is loaded
  useEffect(() => {
    getContacts()(contactDispatch);
    // eslint-disable-next-line
  }, []);
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please Enter some contacts...</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((data, index) => {
                return (
                  <CSSTransition key={index} timeout={500} classNames="item">
                    <ContactItem contact={data} />
                  </CSSTransition>
                );
              })
            : contacts.map((data, index) => {
                return (
                  <CSSTransition key={index} timeout={500} classNames="item">
                    <ContactItem contact={data} />
                  </CSSTransition>
                );
              })}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
