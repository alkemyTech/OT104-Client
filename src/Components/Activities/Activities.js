import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ActivitiesList from "./ActivitiesList";
import ActivitiesTitle from "./ActivitiesTitle";
import {
  alertServiceError,
  alertServiceSimple,
  alertServiceTimer,
} from "../Alert/AlertService";
const Activities = () => {
  return (
    <Container fluid>
      <Row style={{ marginTop: "5%" }}>
        <Col></Col>
        <Col xs={5}>
          <ActivitiesTitle />
        </Col>
        <Col></Col>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <Col></Col>
        <Col xs={10}>
          <div style={{ marginTop: "5%" }}>
            <ActivitiesList data={undefined} />
          </div>
        </Col>
        <Col>
          <button
            onClick={() =>
              alertServiceTimer(
                "top-end",
                "success",
                "Your work has been saved",
                false,
                1500
              )
            }
          >
            este boton dispara la alerta
          </button>
          <button onClick={() => alertServiceSimple("Something went wrong!")}>
            este boton dispara la alerta SIMPLE
          </button>
          <button
            onClick={() =>
              alertServiceError("Something went !", "Something went wrong!")
            }
          >
            este boton dispara la alerta ERROR
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Activities;
