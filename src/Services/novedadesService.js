import axios from 'axios';
const baseUrl = 'http://ongapi.alkemy.org/api/news';

const getNews = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const createNews = async (news) => {
  try {
    const response = await axios.post(`${baseUrl}`, news);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const getNewsById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const updateNews = async (id, news) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, news);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const deleteNews = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const NovedadesService = {
  delete: deleteNews,
  getDetail: getNewsById,
  getAll: getNews,
  create: createNews,
  update: updateNews,
};
