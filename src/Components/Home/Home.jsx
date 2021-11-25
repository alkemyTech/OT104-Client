import React from "react";
import Newness from "./Newness";
import Slider from "./Slider";
import "./styles/home.css";

function Home() {
  return (
    <div className="home-conatiner">
      <Slider />
      <h1>
        Bienvenidos <br />a <br />
        Somos más
      </h1>
      <Newness />
    </div>
  );
}

export default Home;
