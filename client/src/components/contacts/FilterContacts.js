import React, { useContext, useRef } from "react";
import allActions from "../../context/actions";
import { GlobalContext } from "../../context/Provider";
const FilterContacts = () => {
  // Getting Context API
  const { contactDispatch } = useContext(GlobalContext);
  // Getting Actions
  const {
    allContactsActions: { filterContacts, clearFilter },
  } = allActions;
  // Creating Reference for input text
  const textRef = useRef("");
  // Capturing input text onChange
  const inputTextOnChange = () => {
    console.log(textRef.current.value);
    if (textRef.current.value !== "") {
      filterContacts(textRef.current.value)(contactDispatch);
    } else {
      clearFilter()(contactDispatch);
    }
  };
  return (
    <form>
      <input
        ref={textRef}
        type="text"
        placeholder="Filter Contacts..."
        onChange={inputTextOnChange}
      ></input>
    </form>
  );
};

export default FilterContacts;
