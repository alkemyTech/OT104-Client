import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const navBarItems = [
  { name: "Inicio", path: "/", id: 1 },
  { name: "Nosotros", path: "/Nosotros", id: 2 },
  { name: "Contacto", path: "/contacto", id: 3 },
];
import somosMasLogo from "../../images/LOGO-SOMOS-MAS.png";
import "./style.scss";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-container">
      <Container>
        <Navbar.Brand>
          <Image src={somosMasLogo} alt="somos-mas-logo" className="logo-img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {localStorage.getItem("token") === null ? (
              <></>
            ) : (
              navBarItems.map((item) => {
                return (
                  <Nav.Link key={item.id}>
                    <NavLink to={item.path} className="link-to-section">
                      {item.name}
                    </NavLink>
                  </Nav.Link>
                );
              })
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
