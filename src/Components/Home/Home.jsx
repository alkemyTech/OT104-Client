import React, { useState, useEffect } from "react";
import axios from "axios";
import Newness from "./Newness";
import Slider from "./Slider/Slider";
import service from "../../Services/slidesService";
import Loader from "../../Components/Home/Loader";
import fakeSlides from "./fakeSlides";
import Alert from "react-bootstrap/Alert";

function Home() {
  // we need to replace the fakeSlides with the real data from the server
  // remove the fakeSlides from the code

  const [slides, setSlides] = React.useState([...fakeSlides]);
  const [slidesError, setSlidesError] = React.useState(false);
  // uncomment the lines below to get slides from server
  // const getSlides = async () => {
  //   const res = await service.getAll();
  //   if (res && res.status !== 200) {
  //     setSlidesError(true);
  //     return;
  //   }
  //   const slidesFromServer = res.data.data;
  //   setSlides([...slidesFromServer]);
  // };
  // React.useEffect(() => {
  //   getSlides();
  // }, []);

  const [news, setNews] = useState([]);
  const [newsError, setNewsError] = useState(false);
  // this need to use the service api
  useEffect(() => {
    setNewsError(false);
    const getNewsData = async () => {
      setNewsError(false);
      await axios
        .get("http://ongapi.alkemy.org/api/news?limit=4")
        .then((newData) => {
          setNews((news) => newData.data.data);
        })
        .catch((err) => {
          setNewsError(true);
        });
    };
    getNewsData();
  }, []);

  return (
    <div className="home-container">
      <Slider slides={slides} />
      {slidesError && <Alert variant="danger">Error loading slides</Alert>}
      <h1 className="text-center m-2">
        Bienvenidos <br />a <br />
        Somos más
      </h1>
      {slides.length === 0 && <Loader />}
      {news.length === 0 && <Loader />}
      <h2 className="text-center mt-3">Ultimas Novedades</h2>
      <Newness news={news} />
      {newsError && <Alert variant="danger">Error loading news</Alert>}
    </div>
  );
}

export default Home;
