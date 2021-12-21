import React from "react";
import styles from "./footer.module.css";

const LINKS = {
  home: "http://localhost:3000/",
  toysCampaign: "http://localhost:3000/toys-campaign",
  facebook: "https://www.facebook.com/Somos_Más/",
  instagram: "https://www.instagram.com/SomosMás/",
};

const Footer = () => {
  return (
    <footer>
      <div>
        <a href={LINKS.home} className={styles.link}>
          <img
            src="images/LOGO-SOMOS-MAS.png"
            className={styles["somos-mas-logo"]}
          />
          <label className={styles["somos-mas-text"]}>Somos Más</label>
        </a>
      </div>
      <div>
        <a
          href={LINKS.toysCampaign}
          className={`${styles["others-campaign-text"]} ${styles.link}`}
        >
          Campaña de Juguetes
        </a>
      </div>
      <div className={styles["social-media"]}>
        <div>
          <a href={LINKS.facebook} className={styles.link}>
            <img src="images/facebook-logo.png" />
            <label>facebook/Somos_Más</label>
          </a>
        </div>
        <div>
          <a href={LINKS.instagram} className={styles.link}>
            <img src="images/instagram-logo.png" />
            <label>instagram/SomosMás</label>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
