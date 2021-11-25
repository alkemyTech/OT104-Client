import React from "react";
import Slider from "./Slider";

function Home() {
  return (
    <div className="home-conatiner">
      <div className="slider-newness-container">
        <Slider />
      </div>
      <h1>
        Bienvenidos <br />a <br />
        Somos más
      </h1>
    </div>
  );
}

export default Home;
