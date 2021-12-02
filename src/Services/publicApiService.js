import axios from 'axios';

const config = {
    headers: {
        Group: 01                //Aqui va el ID del equipo!!
    }
}

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export const postRequest = async (path_url, dataBody) => {
    const response = await axios.post(
      `http://ongapi.alkemy.org/${path_url}`,
      JSON.stringify({
        dataBody,
      }),
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${token}`
        },
      }
    );
  };

export default Get 
