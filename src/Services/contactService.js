import { getRequest } from './publicApiService';
import { postRequest, putRequest, deleteRequest } from './privateApiService';

const baseURL = 'http://ongapi.alkemy.org/api/contacts';

const getContacts = () => {
  return getRequest(baseURL);
};

const createContact = (contact) => {
  return postRequest(baseURL, contact);
};

const getContact = (id) => {
  return getRequest(baseURL + id);
};

const editContact = (contact) => {
  return putRequest(baseURL + contact.id, contact);
};

const deleteContact = (id) => {
  return deleteRequest(baseURL + id);
};

const contactService = {
  get: getContacts,
  getById: getContact,
  create: createContact,
  edit: editContact,
  delete: deleteContact,
};

export default contactService;
