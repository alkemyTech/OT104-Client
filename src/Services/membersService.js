import { getRequest, postRequest, putRequest, deleteRequest } from "./privateApiService";

const path = "http://ongapi.alkemy.org/api/members";


const getMembers = () => {
    return getRequest(path, null);
};

const getMemberById = (id) => {
    getRequest(path, id);
};

const createMember = (body) => {
    return postRequest(path, body);
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
    delete: deleteMember
};

export default membersService;