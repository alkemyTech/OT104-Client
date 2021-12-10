import axios from 'axios';

const config = {
  headers: {
    Group: 104, //Aqui va el ID del equipo!!
  },
};

const postRequest = async (url, dataBody) => {
  try {
    const header = VerifyToken();
    let res = await axios.post(url, dataBody, { header });
    return res;
  } catch (err) {
    return err;
  }
};

const putRequest = async (url, id, body) => {
  try {
    const header = VerifyToken();
    let res = await axios.put(`${url}/${id}`, body, { header });
    return res;
  } catch (error) {
    return error;
  }
};

const patchRequest = async (url, id, body) => {
  const header = VerifyToken();
  try {
    const res = await axios.patch(`${url}/${id}`, body, { header });
    return res;
  } catch (error) {
    return error;
  }
};

const deleteRequest = (pathToDelete, token) => {
  fetch(`http://ongapi.alkemy.org/api/${pathToDelete}`, {
    method: 'DELETE',
    headers: {
      Authorization: VerifyToken(),
    },
  })
    .then((res) => res.json())
    .catch((error) =>
      alert('No se pudo borrar el recurso. Error: ' + error + '.')
    )
    .then((data) => alert('El recurso fue borrado correctamente.'))
    .catch((error) =>
      alert('No se pudo borrar el recurso. Error: ' + error + '.')
    );
};

// Method to verify if the token is in the localStorage and return a header with the token
const VerifyToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    return header;
  }
  return null;
};

export { VerifyToken, putRequest, patchRequest, deleteRequest, postRequest };
