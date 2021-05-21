import { SET_ALERT, REMOVE_ALERT } from "../constant/types";
const alertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((data) => {
        return data.id !== action.payload;
      });
    default:
      return state;
  }
};

export default alertReducer;
