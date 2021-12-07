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

export const Post = (route, body) => {
    axios.post(route, {
        body: body
    }).then(res => console.log(res))
    .catch(err => console.log(err))
}

export default Get