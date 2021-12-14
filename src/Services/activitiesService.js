// TODO >>> we need to replace the baseUrl with the one from .env variable
// const baseUrl = process.env.REACT_APP_HERE_THE_BASE_URL_FOR_ACTIVITIES;
const baseUrl = 'http://ongapi.alkemy.org/api/activities/';

import {
  putRequest,
  deleteRequest,
  postRequest,
  getRequest,
} from './privateApiService';

const getActivities = () => {
  return getRequest(baseUrl);
};
const getActivity = (activityId) => {
  return getRequest(`${baseUrl}${activityId}`);
};

const createActivity = (dataToCreateActivity) => {
  return postRequest(baseUrl, dataToCreateActivity);
};

const updateActivity = (activityId, dataToUpdate) => {
  return putRequest(`${baseUrl}${activityId}`, dataToUpdate);
};

const deleteActivity = (activityId) => {
  return deleteRequest(`${baseUrl}${activityId}`);
};

export {
  getActivities,
  getActivity,
  updateActivity,
  createActivity,
  deleteActivity,
};
