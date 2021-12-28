import React from "react";
import { Navbar, Container } from "react-bootstrap";
import LogoCampaña from "../../images/logo campaña.png";
import LogoONG from "../../images/logo ong.png";
import "./headerSchool.css";

const Header = () => {
  return (
    <Navbar>
      <Container className="d-flex justify-content-between">
        <div className="divSc">
          <img className="logoCampanaSc" src={LogoCampaña} alt="logoCampaña" />
        </div>
        <div className="divSc">
          <h4 className="textSc">
            Mejorar la calidad de vida de niños y familias en situación de
            vulnerabilidad en el barrio La Cava <br /> otorgando un cambio de
            rumbo en cada individuo a través de la educación, salud, trabajo,
            <br />
            deporte, responsabilidad y compromiso
          </h4>
        </div>
        <div className="divSc">
          <img className="logoOngSc" src={LogoONG} alt="logoONG" />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
