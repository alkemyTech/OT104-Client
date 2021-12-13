import React, { useEffect, useState } from "react";
// axios will be removed in the next version and use apiService instead.
import axios from "axios";
import MiembrosAbout from "./MiembrosAbout";
import TextoAbout from "./TextoAbout";
import TituloAbout from "./TituloAbout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "../../Components/About/Loader";

const About = () => {
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutTitleError, setAboutTitleError] = useState(false);
  const [aboutText, setAboutText] = useState("");
  const [aboutTextError, setAboutTextError] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [memberListError, setMemberListError] = useState(false);
  const content = (
    <>
      <Row style={{ marginTop: "5%" }}>
        <Col></Col>
        <Col xs={5}>
          <TituloAbout title={aboutTitle} />
          {aboutTitleError && (
            <Alert variant="danger">Error loading the title</Alert>
          )}
        </Col>
        <Col></Col>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <Col></Col>
        <Col xs={10}>
          <TextoAbout aboutDescription={aboutText} />
          {aboutTextError && (
            <Alert variant="danger">Error loading the text cotent</Alert>
          )}
        </Col>
        <Col></Col>
        <div style={{ marginTop: "5%" }}>
          {" "}
          <MiembrosAbout memberList={memberList} />
          {memberListError && (
            <Alert variant="danger">Error loading List of Members</Alert>
          )}
        </div>
      </Row>
    </>
  );
  useEffect(() => {
    const loadUsers = async () => {
      setAboutTitleError(false);
      setAboutTextError(false);
      const response = await axios.get(
        `http://ongapi.alkemy.org/api/organization`
      );
      if (response && response.status !== 200) {
        setAboutTitleError(true);
        setAboutTextError(true);
        return;
      }
      setAboutTitle(response.data.data.name);
      setAboutText(response.data.data.short_description);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      setMemberListError(false);
      const response = await axios.get(`http://ongapi.alkemy.org/api/members`);
      if (response && response.status !== 200) {
        setMemberListError(true);
        return;
      }
      setMemberList(response.data.data);
    };
    loadUsers();
  }, []);

  return (
    <Container fluid>
      {aboutTitle === "" && aboutText === "" && memberList.length === 0 ? (
        <Loader />
      ) : (
        content
      )}
    </Container>
  );
};

export default About;
