import React from "react";
import Carousel from "react-bootstrap/Carousel";

function SliderBS({ slides }) {
  return (
    <Carousel style={{ height: "487px" }}>
      {Array.isArray(slides) &&
        slides.map((slide) => {
          return (
            <Carousel.Item interval={5000} key={slide.id}>
              <img
                className="d-block w-100 overflow-hidden"
                src={slide.image}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{slide.name}</h3>
                <p>{slide.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}

SliderBS.propTypes = {
  slides(props, propsName, componentName) {
    if (!Array.isArray(props[propsName])) {
      return new Error(
        `Invalid prop '${propsName}' supplied to '${componentName}'. You need to pass an array of slides.`
      );
    }
  },
};

export default SliderBS;
