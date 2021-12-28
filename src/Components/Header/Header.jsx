import React, {useState, useEffect} from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
<<<<<<< HEAD
import { Link, NavLink } from "react-router-dom";
=======
>>>>>>> main
import somosMasLogo from "../../images/LOGO-SOMOS-MAS.png";
import "./style.scss";
import { useSelector } from "react-redux";

<<<<<<< HEAD
function Header() {

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

=======
const publicLinks = [
  { name: "Inicio", path: "/", id: 1 },
  { name: "Nosotros", path: "/about", id: 2 },
  {name: "Actividades", path: "/Actividades", id: 3},
  { name: "Novedades", path: "/Novedades", id: 4 },
]


function Header({isAuth, userRole}) {
>>>>>>> main
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-container">
      <Link to="/">
        <Navbar.Brand>
          <Image src={somosMasLogo} alt="somos-mas-logo" className="logo-img" />
        </Navbar.Brand>
          </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
<<<<<<< HEAD
          <Nav>
                  <NavLink to="/home" className="link-to-section">Inicio</NavLink>
                  <NavLink to="/about" className="link-to-section">Nosotros</NavLink>
                  <NavLink to="/contact" className="link-to-section">Contacto</NavLink>
            {isAuth ? 
            <button className="btn text-danger" onClick={()=>{
              localStorage.removeItem("token")
              window.location.reload();
              }}>Cerrar sesión</button>  :
            <NavLink to="/login" className="link-to-section">Iniciar sesión</NavLink>
            }
=======
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
            
>>>>>>> main
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
