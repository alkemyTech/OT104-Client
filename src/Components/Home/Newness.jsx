import React from "react";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./styles/newness.css";

function Newness({ news }) {
  return (
    <Container id="news-container">
      <Container id="cards-container" className="p-1">
        {news.map((data, index) => {
          return (
            <Card id="card" key={index} className="mb-2">
              <Card.Img variant="top" src={data.image} />
              <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Button variant="primary" data-id={data.id}>
                  Leer mas
                </Button>
              </Card.Body>
            </Card>
          );
        })}
        <Container className="text-center">
          <Button>Ver mas</Button>
        </Container>
      </Container>
    </Container>
  );
}

export default Newness;
