import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./privateApiService";

const path = process.env.REACT_APP_MEMBERS_BASE_;

const getMembers = () => {
  return getRequest(null);
};

const getMemberById = (id) => {
  getRequest(path, id);
};

const createMember = async (body) => {
  let res = await postRequest(path, body);
  return res;
};

const modifyMember = (id, body) => {
  return putRequest(path, id, body);
};

const deleteMember = (id) => {
  return deleteRequest(path, id);
};

const membersService = {
  get: getMembers,
  getById: getMemberById,
  create: createMember,
  edit: modifyMember,
  delete: deleteMember,
};

export default membersService;
