import React from "react";
import { Navbar, Container } from "react-bootstrap";
import LogoCampaña from "../../images/logo campaña.png";
import LogoONG from "../../images/logo ong.png";
import "./header.css";

const Header = () => {
  return (
    <Navbar>
      <Container className='d-flex justify-content-between'>
        <div>
          <img className='logoCampaña' src={LogoCampaña} alt='logoCampaña' />
        </div>
        <div>
          <h2 className='slogan'>Slogan Campaña</h2>
        </div>
        <div>
          <img className='logoONG' src={LogoONG} alt='logoONG' />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
