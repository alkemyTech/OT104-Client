import axios from 'axios';

function mockMethodAuthorization(token){
    return "Basic " + token;
}

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

export const Delete = ( pathToDelete, token ) => {
    fetch(`http://ongapi.alkemy.org/api/${pathToDelete}`,{
        method: "DELETE",
        headers:{
            Authorization: mockMethodAuthorization()
        }
    })
    .then((res) => res.json())
    .catch((error) => alert("No se pudo borrar el recurso. Error: " + error + "."))
    .then((data) => alert("El recurso fue borrado correctamente."))
    .catch((error) => alert("No se pudo borrar el recurso. Error: " + error + "."))

}

export default Get