import axios from "axios";

// const config = {
//   headers: {
//     Group: 01, //Aqui va el ID del equipo!!
//   },
// };

function Get(url) {
  const isToken = VerifyToken();
  if (isToken) {
    axios
      .get(url, {
        headers: isToken,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return new Error("The token is needed for this method");
}
export { Get };
