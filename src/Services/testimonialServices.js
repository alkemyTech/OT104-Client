const baseURL = process.env.REACT_APP_URL_TESTIMONIAL;
import {
  putRequest,
  deleteRequest,
  postRequest,
  getRequest,
} from "./privateApiService";

const getTestimonial = () => {
  return getRequest(baseURL);
};
const getTestimonialById = (testimonialId) => {
  return getRequest(`${baseURL}/${testimonialId}`);
};

const createTestimonial = (dataToCreateTestimonial) => {
  return postRequest(baseURL, dataToCreateTestimonial);
};

const updateTestimonial = (testimonialId, dataToUpdate) => {
  return putRequest(`${baseURL}/${testimonialId}`, dataToUpdate);
};

const deleteTestimonial = (testimonialId) => {
  return deleteRequest(`${baseURL}/${testimonialId}`);
};

export {
  getTestimonial,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
