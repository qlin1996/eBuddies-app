import axios from "axios";
import { serverLink } from "./serverLink";
const CREATE_MESSAGE = "CREATE_MESSAGE";

export const createMesssage = (message) => {
  return {
    type: CREATE_MESSAGE,
    message,
  };
};

export const createMesssageThunk = (message) => async (dispatch) => {
  try {
    console.log("THSI IS THE MESSAGE", message);
    const { data } = await axios.post(`${serverLink}/api/messages`, message);
    console.log("THIS IS THE DATA", data);
    return dispatch(createMesssage(data));
  } catch (error) {
    console.log(error);
  }
};
// const initialState = {
//   message: {},
// };
export default function createMessageReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return { ...state, message: action.message };
    default:
      return state;
  }
}