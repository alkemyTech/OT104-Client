import axios from 'axios';
import { VerifyToken } from './privateApiService';

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

export default Get;
