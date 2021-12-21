import axios from "axios";
import { alertServiceError } from "../Components/Alert/AlertService";
const config = {
  headers: {
    Group: 104, //Aqui va el ID del equipo!!
  },
};

async function getRequest(url) {
  const headers = VerifyToken();
  if (headers) {
    try {
      const res = await axios.get(url, { headers });
      return res;
    } catch (err) {
      return alertServiceError("Error to Get", err.message);
    }
  }
  return alertServiceError("Error", "The token is needed for this method");
}

const postRequest = async (url, dataBody) => {
  const headers = VerifyToken();
  if (headers) {
    try {
      let res = await axios.post(url, dataBody, { headers });
      return res;
    } catch (err) {
      return alertServiceError("Error to Post", err.message);
    }
  }
  return alertServiceError("Error", "The token is needed for this method");
};

const putRequest = async (url, id, body) => {
  const headers = VerifyToken();
  if (headers) {
    try {
      let res = await axios.put(`${url}/${id}`, body, { headers });
      return res;
    } catch (err) {
      return alertServiceError("Error to Put", err.message);
    }
  }
  return alertServiceError("Error", "The token is needed for this method");
};

const patchRequest = async (url, id, body) => {
  const headers = VerifyToken();
  if (headers) {
    try {
      const res = await axios.patch(`${url}/${id}`, body, { headers });
      return res;
    } catch (error) {
      return alertServiceError("Error to Patch", err.message);
    }
  }
  return alertServiceError("Error", "The token is needed for this method");
};

const deleteRequest = async (url, id) => {
  const headers = VerifyToken();
  if (headers) {
    try {
      const res = await axios.delete(`${url}/${id}`, { headers });
      return res;
    } catch (error) {
      return alertServiceError("Error to Delete", err.message);
    }
  }
  return alertServiceError("Error", "The token is needed for this method");
};

// Method to verify if the token is in the localStorage and return a header with the token
const VerifyToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    return header;
  }
  return null;
};

const checkToken = async () => {
  const token = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;
  const res = await axios.get("http://ongapi.alkemy.org/api/auth/me", {
    headers: {
      Authorization: token,
    },
  });
  return res.data.success;
};

export {
  VerifyToken,
  checkToken,
  putRequest,
  patchRequest,
  deleteRequest,
  postRequest,
  getRequest,
};
