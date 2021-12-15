import React from 'react'
import MiembrosAbout from './MiembrosAbout'
import TextoAbout from './TextoAbout'
import TituloAbout from './TituloAbout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const About = () => {
  return (
    <Container fluid>
      <Row style={{ marginTop: "5%" }}>
        <Col></Col>
        <Col xs={5}>< TituloAbout /></Col>
        <Col></Col>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <Col></Col>
        <Col xs={10}><TextoAbout /></Col>
        <Col></Col>
        <div style={{ marginTop: "5%" }}> <MiembrosAbout /></div>
      </Row>
    </Container >
  )
}

export default About
