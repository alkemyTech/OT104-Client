import React from "react";
import { Navbar, Container } from "react-bootstrap";
import LogoCampaña from "../../images/logo campaña.png";
import LogoONG from "../../images/logo ong.png";
import "./header.css";

const Header = () => {
  return (
    <Navbar>
      <Container className="d-flex justify-content-between">
        <div>
          <img className="logoCampaña" src={LogoCampaña} alt="logoCampaña" />
        </div>
        <div>
          <h2 className="slogan">
            Mejorar la calidad de vida de niños y familias en situación de
            vulnerabilidad en el barrio La Cava otorgando <br></br> un cambio de
            rumbo en cada individuo a través de la educación, salud, trabajo,
            deporte, responsabilidad y compromiso
          </h2>
        </div>
        <div>
          <img className="logoONG" src={LogoONG} alt="logoONG" />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
