import axios from "axios";

// const config = {
//   headers: {
//     Group: 01, //Aqui va el ID del equipo!!
//   },
// };

const Get = async (url, id = null) => {
  const URL = `${url}/${id ? id : ""}`;
  const autorization = VeryfyToken();
  try {
    if (autorization) {
      const response = await axios.get(URL, { headers: autorization });

      const data = response.json();
      return data;
    }
    return null;
  } catch (error) {
    return new Error("GET Method Error: ", error);
  }
};

export { Get };
