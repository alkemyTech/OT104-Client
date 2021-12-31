import React from "react";
import { Container } from "react-bootstrap";

const TextoAbout = ({ aboutDescription }) => {
  return (
    <Container>
      <h5 className="text-center">{aboutDescription}</h5>
    </Container>
  );
};

export default TextoAbout;
