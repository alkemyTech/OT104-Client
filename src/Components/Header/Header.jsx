import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const navBarItems = [
  { name: "Inicio", path: "/", id: 1 },
  { name: "Nosotros", path: "/Nosotros", id: 2 },
  { name: "Contacto", path: "/contacto", id: 3 },
];
import somosMasLogo from "../../images/LOGO-SOMOS-MAS.png";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Image src={somosMasLogo} alt="somos-mas-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={"/Nosotros"}>Nosotros</NavLink>;
            {navBarItems.map((item) => {
              console.log(item);
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
