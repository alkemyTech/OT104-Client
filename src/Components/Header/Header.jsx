import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
const navBarItems = [
  { name: "Inicio", path: "/", id: 1 },
  { name: "Nosotros", path: "/Nosotros", id: 2 },
  { name: "Contacto", path: "/contacto", id: 3 },
  { name: "Campañas", path: "/campañas", id: 4 },
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
            {localStorage.getItem("token") === null ? (
              <></>
            ) : (
              navBarItems.map((item) => {
                return (
                  <Nav.Link key={item.id} active="bg primary">
                    <NavLink to={item.path}>{item.name}</NavLink>
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
