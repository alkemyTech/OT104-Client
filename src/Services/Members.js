import { getRequest, postRequest, putRequest, deleteRequest } from "./privateApiService";

const path = "http://ongapi.alkemy.org/api/members";

const membersRequests = {
    getMembers: () => {
        getRequest(path, null);
    },

    getMemberById: (id) => {
        getRequest(path, id);
    },

    createMember: (body) => {
        postRequest(path, body);
    },

    modifyMember: (id, body) => {
        putRequest(path, id, body);
    },

    deleteMember: (id) => {
        deleteRequest(path, id);
    }
}

export default membersRequests;