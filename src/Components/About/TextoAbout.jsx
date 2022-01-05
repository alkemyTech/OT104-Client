import React from "react";
import { Container } from "react-bootstrap";

const TextoAbout = ({ aboutDescription }) => {
  return (
    <Container>
      <h5 dangerouslySetInnerHTML={{ __html: aboutDescription }} className="text-center"></h5>
    </Container>
  );
};

export default TextoAbout;
