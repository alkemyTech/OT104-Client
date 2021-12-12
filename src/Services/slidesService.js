import {
  postRequest,
  putRequest,
  deleteRequest,
  getRequest,
} from "./privateApiService";

const baseUrl = process.env.REACT_APP_SLIDES_ENDPOINT;

const getSlides = () => {
  return getRequest(baseUrl);
};

const getSlide = (id) => {
  return getRequest(`${baseUrl}/${id}`);
};

const createSlide = (slide) => {
  return postRequest(baseUrl, slide);
};

const updateSlide = (slide, id) => {
  return putRequest(baseUrl, id, slide);
};

const deleteSlide = (id) => {
  return deleteRequest(baseUrl, id);
};

export default {
  get: getSlide,
  getAll: getSlides,
  create: createSlide,
  update: updateSlide,
  delete: deleteSlide,
};
