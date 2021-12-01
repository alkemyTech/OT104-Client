import React from "react";

import slide1 from "./img/photo1.jpg";
import slide2 from "./img/photo2.jpg";
import slide3 from "./img/photo3.jpg";
import slide4 from "./img/photo4.jpg";

import { Carousel } from "react-bootstrap";

function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={slide1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide2} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide3} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide4} alt="First slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
