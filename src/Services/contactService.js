import { getRequest } from './publicApiService';
import { postRequest, putRequest, deleteRequest } from './privateApiService';

const baseURL = 'http://ongapi.alkemy.org/api/contacts';

export const getContacts = () => {
  return getRequest(baseURL);
};

export const createContact = (contact) => {
  return postRequest(baseURL, contact);
};

export const getContact = (id) => {
  return getRequest(baseURL + id);
};

export const editContact = (contact) => {
  return putRequest(baseURL + contact.id, contact);
};

export const deleteContact = (id) => {
  return deleteRequest(baseURL + id);
};
