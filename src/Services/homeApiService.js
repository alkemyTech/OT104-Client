import axios from "axios";
const baseUrl = "http://ongapi.alkemy.org/api/";

const getMethod = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const postMethod = async (path, bodyData) => {
  try {
    const response = await axios.post(`${baseUrl}/${path}`, bodyData);
    return response.data;
  } catch (err) {
    return err;
  }
};

const putMethod = async (path, id, bodyData) => {
  try {
    const response = await axios.put(`${baseUrl}/${path}/${id}`, bodyData);
    return response.data;
  } catch (err) {
    return err;
  }
};

const deleteMethod = async (path, id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${path}/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const homeServices = {
  get: getMethod,
  put: putMethod,
  post: postMethod,
  delete: deleteMethod,
};
