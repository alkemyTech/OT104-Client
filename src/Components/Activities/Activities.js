import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ActivitiesList from './ActivitiesList';
import ActivitiesTitle from './ActivitiesTitle';
const Activities = () => {
  return (
    <Container fluid>
      <Row style={{ marginTop: '5%' }}>
        <Col></Col>
        <Col xs={5}>
          <ActivitiesTitle />
        </Col>
        <Col></Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col></Col>
        <Col xs={10}>
          <div style={{ marginTop: '5%' }}>
            <ActivitiesList />
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Activities;
