import axios from "axios";
const baseUrl = "http://ongapi.alkemy.org/api/";

const getMethod = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const postMethod = async (path, bodyData) => {
  const response = await axios.post(`${baseUrl}/${path}/${id}`, bodyData);
  return response.data;
};

const putMethod = async (path, id, bodyData) => {
  const response = await axios.put(`${baseUrl}/${path}/${id}`, bodyData);
  return response.data;
};

const deleteMethod = async (path, id) => {
  const response = await axios.delete(`${baseUrl}/${path}/${id}`);
  return response.data;
};

export const homeServices = {
  get: getMethod,
  put: putMethod,
  post: postMethod,
  delete: deleteMethod,
};
