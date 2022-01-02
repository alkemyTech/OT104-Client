const baseUrl = process.env.REACT_APP_ACTIVITY_URL;

import {
  putRequest,
  deleteRequest,
  postRequest,
  getRequest,
} from "./privateApiService";

const getActivities = () => {
  return getRequest(baseUrl);
};
const getActivity = (activityId) => {
  return getRequest(`${baseUrl}/${activityId}`);
};

const createActivity = (dataToCreateActivity) => {
  return postRequest(baseUrl, dataToCreateActivity);
};

const updateActivity = (activityId, dataToUpdate) => {
  return putRequest(`${baseUrl}`, activityId, dataToUpdate);
};

const deleteActivity = (activityId) => {
  return deleteRequest(`${baseUrl}/${activityId}`);
};

export {
  getActivities,
  getActivity,
  updateActivity,
  createActivity,
  deleteActivity,
};
