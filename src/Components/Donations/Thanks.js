import React from "react";
import styles from "./Thanks.module.css";
import logo from "../../images/LOGO-SOMOS-MAS.png";
import { useHistory } from "react-router-dom";

function Thanks() {
  const history = useHistory();

  return (
    <div className={styles.thanksMessageContainer}>
      <h2 className={styles.thanksMessage}>Muchas gracias por tu ayuda!</h2>
      <div>
        <img
          src={logo}
          alt=""
          onClick={() => history.push("/")}
          className={styles.thanksLogo}
        />
      </div>
    </div>
  );
}

export default Thanks;
