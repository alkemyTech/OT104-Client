import axios from "axios";

const get = async (url, id) => {
  const res =
    id === null ? await axios.get(url) : await axios.get(`${url}/${id}`);
  return res;
};

export default get;
