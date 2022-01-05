import React from "react";
import Card from "../Card/Card";
import { Container, Row } from "react-bootstrap";

function Newness({ news }) {
  return (
    <Container
      style={{ width: "auto" }}
      className="d-flex flex-wrap flex-row mb-3 mt-3 p-2"
    >
      {news.map((data) => {
        return (
          <Card
            image={data.image}
            title={data.name}
            description={data.content}
            equals={true}
            buttonOnLine={true}
            id={data.id}
            key={data.id}
          ></Card>
        );
      })}
    </Container>
  );
}
export default Newness;
