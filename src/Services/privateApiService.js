import axios from "axios";

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
      return err;
    }
  }
  return new Error("The token is needed for this method");
}

const postRequest = async (url, dataBody) => {
  try {
    const header = VerifyToken();
    let res = await axios.post(url, dataBody, { header });
    return res;
  } catch (err) {
    return err;
  }
};

const putRequest = async (url, id, body) => {
  try {
    const header = VerifyToken();
    let res = await axios.put(`${url}/${id}`, body, { header });
    return res;
  } catch (error) {
    return error;
  }
};

const patchRequest = async (url, id, body) => {
  const header = VerifyToken();
  try {
    const res = await axios.patch(`${url}/${id}`, body, { header });
    return res;
  } catch (error) {
    return error;
  }
};

const deleteRequest = async (url, id) => {
  const headers = VerifyToken();

  try {
    const res = await axios.delete(`${url}/${id}`, { headers });
    return res;
  } catch (error) {
    return error;
  }
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

export {
  VerifyToken,
  putRequest,
  patchRequest,
  deleteRequest,
  postRequest,
  getRequest,
};
