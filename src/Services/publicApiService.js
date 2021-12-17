import axios from "axios";
import { alertServiceError } from "../Components/Alert/AlertService";
const config = {
  headers: {
    Group: 104, //Aqui va el ID del equipo!!
  },
};

export const get = async (url) => {
  try {
    const res = await axios.get(url);
    throw new Error();
    return res;
  } catch (err) {
    return alertServiceError("Error to Get", err.message);
  }
};

export const Post = async (route, body) => {
  try {
    const res = await axios.post(route, {
      body: body,
    });
    return res;
  } catch (err) {
    return alertServiceError("Error to Post", err.message);
  }
};
