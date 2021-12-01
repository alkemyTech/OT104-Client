import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ActivitiesList from './ActivitiesList';
import ActivitiesTitle from './ActivitiesTitle';
const Activities = () => {
  return (
    <Container fluid="md">
       <Row>
        <Col>
            <ActivitiesTitle/>
            <ActivitiesList/>
        </Col>
       </Row>
    </Container>
  )
}

export default Activities
