import axios from "axios";
import { serverLink } from "./serverLink";

// network urls
// mac OS
// const localHost = "localhost:8081";

// android
// const localHost = "192.168.1.3:8081";

//ngrok
// const localHost = "http://41f2a4a1c6a8.ngrok.io";

const GET_ACTIVITIES = "GET_ACTIVITIES";
const POST_ACTIVITY = "POST_ACTIVITY";
const DELETE_ACTIVITY = "DELETE_ACTIVITY";

export const getActivities = (activities) => {
  return {
    type: GET_ACTIVITIES,
    activities,
  };
};

export const postActivity = (activity) => ({
  type: POST_ACTIVITY,
  activity,
});

export const deleteActivity = () => ({
  type: DELETE_ACTIVITY,
});

export const getAllActivities = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${serverLink}/api/activities/${userId}`);
    return dispatch(getActivities(data));
  } catch (error) {}
};

export const postNewActivity = (activityObject) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${serverLink}/api/activities/`,
      activityObject
    );
    return dispatch(postActivity(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllActivities = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${serverLink}/api/activities/${userId}`
    );
    return dispatch(deleteActivities(data));
  } catch (error) {
    console.log(error);
  }
};

export default function activityReducer(state = [], action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return action.activities;
    case DELETE_ACTIVITY:
      return [];
    case POST_ACTIVITY:
      return [...state, action.activity];
    default:
      return state;
  }
}
