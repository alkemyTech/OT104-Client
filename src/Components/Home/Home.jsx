import React from "react";
import Newness from "./Newness";
import Slider from "./Slider";
import Header from "../Header/Header";

function Home() {
  return (
    <div className='home-container'>
      <Slider />
      <h1 className='text-center m-2'>
        Bienvenidos <br />a <br />
        Somos más
      </h1>
      <h2 className='text-center mt-3'>Ultimas Novedades</h2>
      <Newness />
    </div>
  );
}

export default Home;
