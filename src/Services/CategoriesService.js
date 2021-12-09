import axios from 'axios';
const baseUrl = 'http://ongapi.alkemy.org/api/';

const getCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}categories`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const creatCategories = async (category) => {
  try {
    const response = await axios.post(`${baseUrl}categories`, category);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const getCategoriesById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}categories/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const updateCategories = async (id, category) => {
  try {
    const response = await axios.put(`${baseUrl}categories/${id}`, category);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const deleteCategories = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}categories/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const userService = {
  delete: deleteCategories,
  get: getCategoriesById,
  getAll: getCategories,
  create: creatCategories,
  update: updateCategories,
};
