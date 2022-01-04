import React, { useEffect } from "react";
import { fetchOrgData } from "../../features/about/aboutReducer";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SubNewsletter from "./SubNewsletter";
import facebookLogo from "./facebook.png";
import instagramLogo from "./instagram.png";
import linkedinLogo from "./linkedin.png";

const Footer = () => {
  const dispatch = useDispatch();
  const { orgData } = useSelector((state) => state.about);

    return (
    <div style={{backgroundColor:"#9AC9FB"}} className="d-flex">
        <Container 
            className="text-center">
        <Row className="my-3">
          <SubNewsletter />
        </Row>
            <Row className="justify-content-center align-items-center">
                <Col>
                    <Link to="/">
                    <img src={orgData.logo} className="m-auto" alt="logo" />
                    </Link>
                </Col>
                <Col className="d-flex flex-column text-center"> 
                    <Link to="/about" className="text-decoration-none text-white">Nosotros</Link>
                    <Link to="/novedades" className="text-decoration-none text-white">Novedades</Link>
                    <Link to="/actividades" className="text-decoration-none text-white">Actividades</Link>
                    <Link to="/school-campaign" className="text-decoration-none text-white">Campaña de vuelta al cole</Link>
                    <Link to="/toys-campaign" className="text-decoration-none text-white">Campaña de juguetes</Link>
                    <Link to="/registerform" className="text-decoration-none text-white">Registrate</Link>
                </Col>
                <Col className="d-flex flex-column text-center"> 
                    <a href={`https://` + orgData.facebook_url} target="_blank"><img style={{height:"45px", padding: "5px"}} src={facebookLogo} alt="facebook" /></a>
                    <a href={`https://` + orgData.instagram_url} target="_blank"><img style={{height:"45px", padding: "5px"}} src={instagramLogo} alt="instagram" /></a>
                    <a href={`https://` + orgData.linkedin_url} target="_blank"><img style={{height:"45px", padding: "5px"}} src={linkedinLogo} alt="linkedin" /></a>
                </Col>
            </Row>
        </Container>
    </div>
  );
};

export default Footer;
