import React, {useState, useEffect} from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import somosMasLogo from "../../images/LOGO-SOMOS-MAS.png";
import "./style.scss";
import { useSelector } from "react-redux";

function Header() {

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-container">
      <Link to="/">
        <Navbar.Brand>
          <Image src={somosMasLogo} alt="somos-mas-logo" className="logo-img" />
        </Navbar.Brand>
          </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
