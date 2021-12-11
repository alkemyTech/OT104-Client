import axios from "axios";

const config = {
  headers: {
    Group: 104, //Aqui va el ID del equipo!!
  },
};

export const get = async (url, id) => {
  const res =
    id === null ? await axios.get(url) : await axios.get(`${url}/${id}`);
  return res;
};

export const Post = async (route, body) => {
  try {
    const res = await axios.post(route, {
      body: body,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
