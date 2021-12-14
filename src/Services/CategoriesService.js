import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from './privateApiService';
const baseURL = 'http://ongapi.alkemy.org/api/categories';

const getCategories = () => {
  return getRequest(baseURL);
};

const creatCategories = (category) => {
  return postRequest(baseURL, category);
};

const getCategoriesById = (id) => {
  return getRequest(`${baseURL}/${id}`);
};

const updateCategories = (id, category) => {
  return putRequest(baseURL, id, category);
};

const deleteCategories = (id) => {
  return deleteRequest(baseURL, id);
};

const categoryService = {
  delete: deleteCategories,
  get: getCategoriesById,
  getAll: getCategories,
  create: creatCategories,
  update: updateCategories,
};

export default categoryService;
