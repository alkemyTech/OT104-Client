import { getRequest } from "./publicApiService";
import { postRequest, putRequest, deleteRequest } from "./privateApiService";

const baseUrl = "http://ongapi.alkemy.org/api/slides/";

export const getSlides = () => {
  return getRequest(baseUrl);
};

export const getSlide = (id) => {
  return getRequest(baseUrl + id);
};

export const createSlide = (slide) => {
  return postRequest(baseUrl, slide);
};

export const updateSlide = (slide) => {
  return putRequest(baseUrl + slide.id, slide);
};

export const deleteSlide = (id) => {
  return deleteRequest(baseUrl + id);
};
