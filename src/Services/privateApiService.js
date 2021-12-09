import axios from "axios";

const config = {
  headers: {
    Group: 104, //Aqui va el ID del equipo!!
  },
};

const Get = () => {
  axios
    .get("https://jsonplaceholder.typicode.com/users", config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const patchRequest = async (url, id, body) => {
  const header = VerifyToken();
  try {
    const res = await axios.patch(`${url}\${id}`, body, {header});
    return res;
  } catch (error) {
    return error;
  }
};

export default Get;

// Method to verify if the token is in the localStorage and return a header with the token
const VerifyToken = () => {
    const token = localStorage.getItem('token');
    if(token) {
        const header = {
            'Authorization': `Bearer ${token}`
        }
        return header
    }
    return null
}

export { VerifyToken, patchRequest };
export default Get
