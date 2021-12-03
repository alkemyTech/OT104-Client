import axios from "axios";

// const config = {
//   headers: {
//     Group: 01, //Aqui va el ID del equipo!!
//   },
// };

const Get = async (url, id) => {
  const res =
    id === null ? await axios.get(url) : await axios.get(`${url}/${id}`);
  return res;
};

export default Get;
