import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/cardnew.css";
import { Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Card } from "react-bootstrap";

function NewsDetail(id) {
  const [news, setNews] = useState([]);

  // It remains to receive the title by props and import the titles component

  useEffect(() => {
    const getNewsData = async () => {
      await axios
        .get("http://ongapi.alkemy.org/api/news")
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
      <h1>Title</h1>
      {news.length === 0 ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Container id="cards-container">
          {news.map((data) => {
            return (
              <Card id="card">
                <Card.Img variant="top" src={data.image} />
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text id="card-content">{data.content}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      )}
    </Container>
  );
}

export default NewsDetail;
