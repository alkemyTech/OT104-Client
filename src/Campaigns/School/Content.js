import React from "react";
import CountDown from "./CountDown";
import styles from "./Content.module.css";
import logoCampain from "./images/logotipo_campania_materiales_escolares.png";

const Content = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sumate a nuestra campaña</h2>
        <div className={styles.logoBox}>
          <img src={logoCampain} alt="" />
        </div>
        <div className={styles.about}>
          <h3 className="text-center">Inicia el 10 de Enero</h3>
          <h4 className="text-center">Buenos Aires, 12hs</h4>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default Content;
