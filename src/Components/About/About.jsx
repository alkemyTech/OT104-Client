import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextoAbout from './TextoAbout'
import TituloAbout from './TituloAbout'

const About = () => {
  return (
    <Container fluid="md">
      <Row>
        <Col>
          <TituloAbout />
          <TextoAbout />

        </Col>
      </Row>
    </Container>
  )
}

export default About
