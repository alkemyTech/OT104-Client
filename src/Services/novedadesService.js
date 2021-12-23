import axios from "axios";
import {
  putRequest,
  deleteRequest,
  postRequest,
  getRequest,
} from "./privateApiService";

import {get} from "./publicApiService"

const baseUrl = "http://ongapi.alkemy.org/api/news";

const getNews = () => {
  const response = get(`${baseUrl}`);
  return response;
};

const createNews = (news) => {
  const response = postRequest(`${baseUrl}`, news);
  return response;
};

const getNewsById = (id) => {
  const response = getRequest(`${baseUrl}/${id}`);
  return response;
};

const updateNews = (id, news) => {
  const response = putRequest(`${baseUrl}`, id, news);
  return response;
};

const deleteNews = (id) => {
  const response = deleteRequest(`${baseUrl}`, id);
  return response;
};

const novedadesService = {
  delete: deleteNews,
  getDetail: getNewsById,
  getAll: getNews,
  create: createNews,
  update: updateNews,
};

export default novedadesService;
