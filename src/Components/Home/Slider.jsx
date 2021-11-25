import React from "react";
import "./styles/sliderStyle.css";
import slide1 from "./img/photo1.jpg";
import slide2 from "./img/photo2.jpg";
import slide3 from "./img/photo3.jpg";
import slide4 from "./img/photo4.jpg";
import slide5 from "./img/photo5.jpg";

function Slider() {
  return (
    <>
      <div id="slider">
        <figure>
          <img src={slide1} alt="slide 1" />
          <img src={slide2} alt="slide 2" />
          <img src={slide3} alt="slide 3" />
          <img src={slide4} alt="slide 4" />
          <img src={slide5} alt="slide 5" />
        </figure>
      </div>
    </>
  );
}

export default Slider;
