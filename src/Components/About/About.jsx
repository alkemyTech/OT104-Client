import React, { useEffect } from "react";
import MiembrosAbout from "./MiembrosAbout";
import TextoAbout from "./TextoAbout";
import TituloAbout from "./TituloAbout";
import RedesAbout from "./RedesAbout";
import { Container, Row, Col } from "react-bootstrap";
import { alertServiceError } from "../Alert/AlertService";
import Spinner from "../Spinner/Spinner";
import {
  fetchOrgData,
  fetchMembersData,
} from "../../features/about/aboutReducer";
import { useDispatch, useSelector } from "react-redux";

const About = () => {
  const dispatch = useDispatch();
  const { orgData, membersData } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchMembersData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrgData());
  }, [dispatch]);

  const content = (
    <>
      <Row style={{ marginTop: "5%" }}>
        <Col></Col>
        <Col xs={5}>
          <TituloAbout ongName={orgData.name} />
        </Col>
        <Col></Col>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <Col></Col>
        <Col xs={10}>
          <TextoAbout aboutDescription={orgData.long_description} />
        </Col>
        <Col></Col>
        <div style={{ marginTop: "5%" }}>
          {" "}
          <MiembrosAbout membersData={membersData} />
        </div>
      </Row>
      <Row>
        <RedesAbout />
      </Row>
    </>
  );

  return (
    <Container fluid>
      {orgData.length === 0 && membersData.length === 0 ? <Spinner /> : content}
    </Container>
  );
};

export default About;
