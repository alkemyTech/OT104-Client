import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import somosMasLogo from "../../images/LOGO-SOMOS-MAS.png";
import "./style.scss";

const publicLinks = [
  { name: "Inicio", path: "/", id: 1 },
  { name: "Nosotros", path: "/about", id: 2 },
  {name: "Actividades", path: "/Actividades", id: 3},
  { name: "Novedades", path: "/Novedades", id: 4 },
]


function Header({isAuth, userRole}) {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-container">
      <Container>
        <Navbar.Brand>
          <Image src={somosMasLogo} alt="somos-mas-logo" className="logo-img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {  
              publicLinks.map((item) => {
                return (
                <Nav.Link
                  key={item.id.toString()}
                  href={item.path}
                  className="link-to-section"
                >
                  {item.name}
                </Nav.Link>
                )
              })
            }
            {!isAuth && 
              <>
                <Nav.Link href="/contact" className="link-to-section">
                  Contacto
                </Nav.Link>
                <Nav.Link href="/donar" className="link-to-section">
                  Contribuir
                </Nav.Link>
                <Nav.Link href="/login" className="link-to-section">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link href="/registerForm" className="link-to-section">
                  Registrarse
                </Nav.Link>
              </>
            }
            {isAuth && userRole === 2 && 
              <>
                <Nav.Link href="/contact" className="link-to-section">
                  Contacto
                </Nav.Link>
                <Nav.Link href="/donar" className="link-to-section">
                  Contribuir
                </Nav.Link>
              </>
            }
            {isAuth && userRole === 1 && 
              <>
               <Nav.Link href="/backoffice" className="link-to-section">
                  Backoffice
                </Nav.Link>
              </>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
