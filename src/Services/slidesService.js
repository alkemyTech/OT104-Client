import {
  postRequest,
  putRequest,
  deleteRequest,
  getRequest,
} from "./privateApiService";
import { get } from "./publicApiService";

const baseUrl = "http://ongapi.alkemy.org/api/slides";

const getSlides = () => {
  return get(baseUrl);
};

const getSlide = (id) => {
  return get(`${baseUrl}/${id}`);
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
