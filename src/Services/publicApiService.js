import axios from 'axios';
import VerifyToken from './privateApiService';

const config = {
  headers: {
    Group: 104, //Aqui va el ID del equipo!!
  },
};

const Get = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/users', config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const postRequest = async (path_url, dataBody) => {
  try {
    const header = VerifyToken();
    let res = await axios.post(
      `${path_url}`,
      { header },
      JSON.stringify({
        dataBody,
      })
    );
    return res;
  } catch (err) {
    throw Error(err.message);
  }
};

export { postRequest };
export default Get;
