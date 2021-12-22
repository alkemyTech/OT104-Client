import React, {useEffect} from "react";
import {fetchOrgData} from "../../features/about/aboutReducer";
import {useDispatch, useSelector} from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import facebookLogo from "./facebook.png"
import instagramLogo from "./instagram.png"
import linkedinLogo from "./linkedin.png"


const Footer = () => {
    const dispatch = useDispatch();
    const {orgData} = useSelector(state=>state.about)
    
    useEffect(() => {
        dispatch(fetchOrgData());
    }, [dispatch])

    return (
    <div style={{backgroundColor:"#9AC9FB"}} className="d-flex">
        <Container 
            className="text-center">
            <Row className="justify-content-center align-items-center">
                <Col>
                <Link to="/">
                <img src={orgData.logo} className="m-auto" alt="logo" />
                </Link>
                </Col>
                <Col> 
                <ul className="d-flex flex-column text-center">
                <Link to="/About" className="text-decoration-none text-white">Nosotros</Link>
                <Link to="/News" className="text-decoration-none text-white">Noticias</Link>
                <Link to="/Testimonials" className="text-decoration-none text-white">Testimonios</Link>
                </ul> 
                </Col>
                <Col>
                <ul className="d-flex flex-column text-center">
                <Link to="/Members" className="text-decoration-none text-white">Miembros</Link>
                <Link to="/Activities" className="text-decoration-none text-white">Actividades</Link>
                <Link to="/RegisterForm" className="text-decoration-none text-white">Registrate</Link>
                </ul> 
                </Col>
                <Col className="justify-self-end">
                <ul className="d-flex align-items-center">
                <a href={`https://` + orgData.facebook_url} target="_blank"><img style={{height:"45px", padding: "5px"}} src={facebookLogo} alt="facebook" /></a>
                <a href={`https://` + orgData.instagram_url} target="_blank"><img style={{height:"45px", padding: "5px"}} src={instagramLogo} alt="instagram" /></a>
                <a href={`https://` + orgData.linkedin_url} target="_blank"><img style={{height:"45px", padding: "5px"}} src={linkedinLogo} alt="linkedin" /></a>
                </ul>
                </Col>
            </Row>
        </Container>
    </div>

    );
}

export default Footer;
