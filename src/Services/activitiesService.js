import axios from "axios";
const baseUrl = "http://ongapi.alkemy.org/api/";

const getActivities = async () => {
  try {
    const response = await axios.get(baseUrl + "activities");
    return response.data;
  } catch (error) {
    return new Error(error);
  }
};
const getActivity = async (activityId) => {
  try {
    const response = await axios.get(`${baseUrl}activities/${activityId}`);
    return response.data;
  } catch (error) {
    return new Error(error);
  }
};

const createActivity = async (dataToCreateActivity) => {
  try {
    const response = await axios.post(
      `${baseUrl}activities/`,
      dataToCreateActivity
    );
    return response.data;
  } catch (error) {
    return new Error(error);
  }
};

const updateActivity = async (activityId, dataToUpdate) => {
  try {
    const response = await axios.put(
      `${baseUrl}activities/${activityId}`,
      dataToUpdate
    );
    return response.data;
  } catch (error) {
    return new Error(error);
  }
};

const deleteActivity = async (activityId) => {
  try {
    const response = await axios.delete(`${baseUrl}activities/${activityId}`);
    return response.data;
  } catch (error) {
    return new Error(error);
  }
};

export {
  getActivities,
  getActivity,
  updateActivity,
  createActivity,
  deleteActivity,
};
