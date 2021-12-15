import axios from "axios";

const config = {
  headers: {
    Group: 104, //Aqui va el ID del equipo!!
  },
};

export const get = async (url) => {
  try {
    const res = await axios.get(url);
    return res;
  } catch (error) {
    return error;
  }
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
