import React, { useEffect, useState } from "react";
import axios from "axios";
import MiembrosAbout from "./MiembrosAbout";
import TextoAbout from "./TextoAbout";
import TituloAbout from "./TituloAbout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { alertServiceError } from "../Alert/AlertService";
import Spinner from "../Spinner/Spinner";
import { fetchOrgData } from "../../features/about/aboutReducer";
import { useDispatch, useSelector } from "react-redux";

const About = () => {
  const dispatch = useDispatch();
  const [memberList, setMemberList] = useState([]);
  const { orgData } = useSelector((state) => state.about);

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
          <TextoAbout aboutDescription={orgData.short_description} />
        </Col>
        <Col></Col>
        <div style={{ marginTop: "5%" }}>
          {" "}
          <MiembrosAbout memberList={memberList} />
        </div>
      </Row>
    </>
  );

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(`http://ongapi.alkemy.org/api/members`);
      if (response && response.status !== 200) {
        alertServiceError("Error cargando los miembros");
        return;
      }
      setMemberList(response.data.data);
    };
    loadUsers();
  }, []);

  return (
    <Container fluid>
      {orgData && memberList.length === 0 ? <Spinner /> : content}
    </Container>
  );
};

export default About;
