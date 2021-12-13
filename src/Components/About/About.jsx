import React, { useEffect, useState } from "react";
// axios will be removed in the next version and use apiService instead.
import axios from "axios";
import MiembrosAbout from "./MiembrosAbout";
import TextoAbout from "./TextoAbout";
import TituloAbout from "./TituloAbout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        `http://ongapi.alkemy.org/api/organization`
      );
      setAboutTitle(response.data.data.name);
      setAboutText(response.data.data.short_description);
    };
    loadUsers();
  }, []);

  return (
    <Container fluid>
      <Row style={{ marginTop: "5%" }}>
        <Col></Col>
        <Col xs={5}>
          <TituloAbout title={aboutTitle} />
        </Col>
        <Col></Col>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <Col></Col>
        <Col xs={10}>
          <TextoAbout aboutDescription={aboutText} />
        </Col>
        <Col></Col>
        <div style={{ marginTop: "5%" }}>
          {" "}
          <MiembrosAbout />
        </div>
      </Row>
    </Container>
  );
};

export default About;
