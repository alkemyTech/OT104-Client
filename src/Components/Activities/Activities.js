import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ActivitiesList from "./ActivitiesList";
import ActivitiesTitle from "./ActivitiesTitle";
import Spinner from "../Spinner/Spinner";

const Activities = () => {
  const [activitiesList, setActivitiesList] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        `http://ongapi.alkemy.org/api/activities`
      );
      setActivitiesList(response.data.data);
    };
    loadUsers();
  }, []);

  return (
    <Container fluid>
      {activitiesList.length > 0 ? (
        <>
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
                <ActivitiesList data={activitiesList} />
              </div>
            </Col>
            <Col></Col>
          </Row>
        </>
      ) : (
        <Row style={{ marginTop: "5%" }}>
          <Col xs={10}>
            <Spinner />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Activities;
