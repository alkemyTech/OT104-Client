import axios from 'axios';
const config = {
  headers: {
    Group: 1 /*Aqui va el ID del equipo!!*/,
  },
};

const Get = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/users', config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const putRequest = async (url, id, body) => {
  try {
    const config = {
      // here we need to call the method to get the token.
      // headers: { Authorization: `Bearer ${token}` },
    };
    let res = await axios.put(`${url}/${id}`, body, { config });
    return res;
  } catch (err) {
    throw Error(err.message);
  }
};
