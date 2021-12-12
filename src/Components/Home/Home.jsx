import React from "react";
import Newness from "./Newness";
import Slider from "./Slider/Slider";
import service from "../../Services/slidesService";
import Loader from "../../Components/Home/Loader";
import fakeSlides from "./fakeSlides";

function Home() {
  // we need to replace the fakeSlides with the real data from the server
  // remove the fakeSlides from the code

  const [slides, setSlides] = React.useState([...fakeSlides]);
  // uncomment the lines below to get slides from server
  // const getSlides = async () => {
  //   const res = await service.getAll();
  //   const slidesFromServer = res.data.data;
  //   setSlides([...slidesFromServer]);
  // };
  // React.useEffect(() => {
  //   getSlides();
  // }, []);

  return (
    <div className="home-container">
      <Slider slides={slides} />
      <h1 className="text-center m-2">
        Bienvenidos <br />a <br />
        Somos más
      </h1>
      {slides.length === 0 && <Loader />}
      <h2 className="text-center mt-3">Ultimas Novedades</h2>
      <Newness />
    </div>
  );
}

export default Home;
