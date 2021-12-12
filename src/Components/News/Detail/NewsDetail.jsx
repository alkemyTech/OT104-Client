import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/cardnew.css";
import Spinner from "./../../Spinner/Spinner";
import Title from "./../../Title/Title";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";

function NewsDetail(props) {
  const [news, setNews] = useState(undefined);
  const id = props.match.params.id;

  useEffect(() => {
    const getNewsData = async () => {
      try {
        const response = await axios.get(
          `http://ongapi.alkemy.org/api/news/${id}`
        );
        setNews(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewsData();
  }, []);

  if (!news) {
    return (
      <div className="container text-center py-5">
        <Spinner />
      </div>
    );
  }

  return (
    <Container id="news-container">
      <Container id="cards-container">
        <Card id="card">
          <Title>{news.name}</Title>
          <Card.Img variant="top" src={news.image} />
          <Card.Body>
            <Card.Text id="card-content">
              {/* Contents comes in string with html tags. We have to convert it to html */}
              <span dangerouslySetInnerHTML={{ __html: news.content }}></span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}

export default NewsDetail;
