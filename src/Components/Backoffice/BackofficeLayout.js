import React from 'react';
import { Container, Row, Col, Navbar, Offcanvas, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const MockNavbar = () => {
    return(
        <Navbar bg="light" expand={false}>
            <Container fluid>
                <Navbar.Brand href="#">Somos Más</Navbar.Brand>
                    <Nav.Link><Link to="/">Inicio</Link></Nav.Link>
                    <Nav.Link><Link to="/Nosotros">Nosotros</Link></Nav.Link>
                    <Nav.Link><Link to="/Actividades">Actividades</Link></Nav.Link>
                    <Nav.Link><Link to="/Novedades">Novedades</Link></Nav.Link>
                    <Nav.Link><Link to="">Testimonios</Link></Nav.Link>
                    <Nav.Link><Link to="/contacto">Contacto</Link></Nav.Link>
                    <Nav.Link><Link to="/donar">Contribuye</Link></Nav.Link>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="start"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Backoffice</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link><Link to="/backoffice/create-slide">Crear Slide</Link></Nav.Link>
                        <Nav.Link><Link to="/backoffice/categories">Categorías</Link></Nav.Link>
                        <Nav.Link><Link to="/backoffice/news">Noticias</Link></Nav.Link>
                        <Nav.Link><Link to="/backoffice/organization/edit">Nosotros</Link></Nav.Link>
                        <Nav.Link><Link to="/backoffice/activities">Actividades</Link></Nav.Link>
                        <Nav.Link><Link to="/backoffice/slides">Slides</Link></Nav.Link>
                        <Nav.Link><Link to="/backoffice/members">Miembros</Link></Nav.Link>
                        <Nav.Link><Link to="/backoffice/users">Usuarios</Link></Nav.Link>
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

const BackofficeLayout = ({children}) => {
    return(
        <Container>
            <Row>
                <MockNavbar/>
            </Row>
            <Row>
                <Col>{children}</Col>
            </Row>

        </Container>
    );
}  

export default BackofficeLayout