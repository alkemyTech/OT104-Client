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
        <button
          className={styles.sliderBtn}
          onClick={() => console.log("This will show you the next image")}
        >
          &gt;
        </button>
      </div>
      <div className={styles.sliderBtnPrev}>
        <button
          className={styles.sliderBtn}
          onClick={() => console.log("This will show you the prev image")}
        >
          &lt;
        </button>
      </div>
      <img className={styles.sliderImage} src={props.image} alt="slider" />
      {props.image.length > 0 && (
        <div className={styles.sliderImageContent}>
          <h1 className={styles.sliderTitle}>{props.title}</h1>
          <p className={styles.sliderDescription}>{props.description}</p>
        </div>
      )}
    </div>
  );
};

function Slider() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    setTimeout(() => {
      index === sliderFakeData.length - 1 ? setIndex(0) : setIndex(index + 1);
    }, 5000);
  }, [index]);
  return (
    <div className={styles.sliderContainer}>
      <SliderImage
        image={sliderFakeData[index].image}
        title={sliderFakeData[index].title}
        description={sliderFakeData[index].description}
      />
    </div>
  );
}

export default Slider;
