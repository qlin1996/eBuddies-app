import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";
const ADD_USER = "ADD_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateCurrentUser = (user) => ({ type: UPDATE_CURRENT_USER, user });

/**
 * THUNK CREATORS
 */
export const putUser = (id, newInfo) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8080/api/users/${id}`,
      newInfo
    );
    return dispatch(updateUserAdmin(id, data));
  } catch (error) {
    console.log(error);
  }
};

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/auth/me");
    if (res.data) {
      dispatch(getUser(res.data));
    } else {
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export const auth1 = (email, password) => async (dispatch) => {
  let res;
  try {
    res = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });
  } catch (error) {
    console.error(error);
  }

  try {
    return dispatch(getUser(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const auth2 = (firstName, lastName, email, password) => async (
  dispatch
) => {
  let res;
  try {
    res = await axios.post("http://localhost:8080/auth/signup", {
      firstName,
      lastName,
      email,
      password,
    });
  } catch (error) {
    console.error(error);
  }

  try {
    return dispatch(getUser(res.data));
  } catch (error) {
    console.error(error);
  }
};
export const getUserInfo = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/users/${id}`);

    return dispatch(getUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/auth/logout");
    history.push("/login");
    return dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = (id, body) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8080/api/users/${id}`,
      body
    );
    return dispatch(updateCurrentUser(data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function userReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_CURRENT_USER:
      return action.user;
    case ADD_USER:
      return [...state, action.user];
    default:
      return state;
  }
}
