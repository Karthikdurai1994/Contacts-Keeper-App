import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
} from "../constant/types";
import axios from "axios";

// ADD CONTACT
const addContact = (contact) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/contacts", contact, config);
    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.message,
    });
  }
};

// GET CONTACTS
const getContacts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/contacts");
    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.message,
    });
  }
};

// UPDATE CONTACT
const updateContact = (contact) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/contacts/${contact._id}`,
      contact,
      config
    );
    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.message,
    });
  }
};

// DELETE CONTACT
const deleteContact = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/contacts/${id}`);
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.message,
    });
  }
};
// SET CURRENT CONTACT
const setCurrentContact = (contact) => (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: contact,
  });
};
// CLEAR CURRENT CONTACT
const clearCurrentContact = () => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT,
  });
};

// FILTER CONTACTS
const filterContacts = (text) => (dispatch) => {
  dispatch({
    type: FILTER_CONTACTS,
    payload: text,
  });
};

// CLEAR FILTER
const clearFilter = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTER,
  });
};

const allContactsActions = {
  addContact,
  deleteContact,
  setCurrentContact,
  clearCurrentContact,
  updateContact,
  filterContacts,
  clearFilter,
  getContacts,
};

export default allContactsActions;
