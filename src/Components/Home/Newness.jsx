import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./styles/newness.css";

function Newness() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getNewsData = async () => {
      await axios
        .get("http://ongapi.alkemy.org/api/news?limit=4")
        .then((newData) => {
          setNews((news) => newData.data.data);
        })
        .catch((err) => {
          alert("Error", err);
        });
    };
    getNewsData();
  }, []);

  return (
    <Container id="news-container">
      {news.length === 0 ? (
        <Spinner animation="border" variant="primary" />
      ) : (
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
      )}
    </Container>
  );
}

export default Newness;
