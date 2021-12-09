import axios from "axios";

const config = {
  headers: {
    Group: 01, //Aqui va el ID del equipo!!
  },
};

const Get = () => {
  axios
    .get("https://jsonplaceholder.typicode.com/users", config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

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

export { VerifyToken }
export default Get
