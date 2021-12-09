import axios from "axios";
const config = {
  headers: {
    Group: 1 /*Aqui va el ID del equipo!!*/,
  },
};

const putRequest = async (url, id, body) => {
  try {
    const header = VerifyToken();
    let res = await axios.put(`${url}/${id}`, body, { header });
    return res;
  } catch (err) {
    throw Error(err.message);
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

export { VerifyToken, putRequest };
export default Get;
