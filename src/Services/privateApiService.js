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

// expected format:
// url:"https://jsonplaceholder.typicode.com/users"
// id: 7
// body: {}
export const patchRequest = async (url, id, body) => {
  // const config = VerifyToken();
  try {
    const res = await axios.patch(url + id, body, config);
    return res;
  } catch (error) {
    return error;
  }
};

export default Get;
