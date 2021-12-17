import React, { useState, useEffect } from "react";
import axios from "axios";
import Newness from "./Newness";
import Slider from "./Slider/Slider";
import service from "../../Services/slidesService";
import newsServices from "../../Services/novedadesService";
import Loader from "../../Components/Home/Loader";
import { alertServiceError } from "../Alert/AlertService";

function Home() {
  const [slides, setSlides] = React.useState([]);
  const getSlides = async () => {
    const res = await service.getAll();
    if (res && res.status !== 200) {
      alertServiceError("Error loading slides");
      return;
    }
    const slidesFromServer = res.data.data;
    setSlides([...slidesFromServer]);
  };
  React.useEffect(() => {
    getSlides();
  }, []);

  const [news, setNews] = useState([]);

  const content = (
    <>
      <Slider slides={slides} />
      <h1 className="text-center m-2">
        Bienvenidos <br />a <br />
        Somos más
      </h1>

      <h2 className="text-center mt-3">Ultimas Novedades</h2>
      <Newness news={news} />
    </>
  );

  useEffect(() => {
    const getNewsData = async () => {
      const res = await newsServices.getAll();
      console.log("res", res);
      if (res && res.status !== 200) {
        alertServiceError("Error loading news");
        return;
      }
      setNews(res.data.data);
    };
    getNewsData();
  }, []);

  return (
    <div className="home-container">
      {news.length === 0 && slides.length === 0 ? <Loader /> : content}
    </div>
  );
}

export default Home;
