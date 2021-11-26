import React from "react";
import styles from "./Slider.module.css";

const sliderFakeData = [
  {
    image: "https://picsum.photos/id/237/800/500",
    title: "First slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    image: "https://picsum.photos/id/238/800/500",
    title: "Second slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    image: "https://picsum.photos/id/239/800/500",
    title: "Third slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
];

const SliderImage = (props) => {
  return (
    <div className={styles.sliderImageContainer}>
      <div className={styles.sliderBtnNext}>
        <button className={styles.sliderBtn} onClick={props.nextSlider}>
          &gt;
        </button>
      </div>
      <div className={styles.sliderBtnPrev}>
        <button className={styles.sliderBtn} onClick={props.prevSlider}>
          &lt;
        </button>
      </div>
      <img className={styles.sliderImage} src={props.image} alt="slider" />
      {props.image && (
        <div className={styles.sliderImageContent}>
          <h1 className={styles.sliderTitle}>{props.title}</h1>
          <p className={styles.sliderDescription}>{props.description}</p>
        </div>
      )}
    </div>
  );
};

// Slider component recibe the data by props or data from fakeData or from a database
// just need this model
// {
//    image: "imageUrl",
//    title: "title",
//    description: "description"
// }
function Slider(props) {
  const [index, setIndex] = React.useState(0);
  const data = props.data || sliderFakeData;
  const nextSlider = () => {
    // setIndex(index === data.length - 1 ? 0 : index + 1);
    setIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };
  const prevSlider = () => {
    setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };
  React.useEffect(() => {
    let waitFiveSecond = setTimeout(() => {
      index === data.length - 1 ? setIndex(0) : setIndex(index + 1);
    }, 5000);
    return () => clearTimeout(waitFiveSecond);
  }, [index]);
  return (
    <div className={styles.sliderContainer}>
      <SliderImage
        nextSlider={nextSlider}
        prevSlider={prevSlider}
        image={data[index].image}
        title={data[index].title}
        description={data[index].description}
      />
    </div>
  );
}

export default Slider;
