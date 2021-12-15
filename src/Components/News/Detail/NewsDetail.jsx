import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { InView } from "react-intersection-observer";
import Spinner from "./../../Spinner/Spinner";
import Title from "./../../Title/Title";
import Comments from "./Comments";
import "./styles/cardnew.css";
import {alertServiceError} from '../../Alert/AlertService'

function NewsDetail(props) {
  const [news, setNews] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = props.match.params.id;

  useEffect(() => {
    const getNewsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          process.env.REACT_APP_URL_GET_NEWS+`/${id}`
        );
        setNews(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    getNewsData();
  }, []);

  // if (!news) {
  //   return (
  //     <div className="container text-center py-5">
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <>
      {loading && <Spinner />}
      {error && alertServiceError('Error', 'No se pudo cargar esta noticia')}
      {news && <>
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

        {/* InView component render it childrens when the element is in viewport */}
        <InView>
          {({ inView, ref }) => (
            <div ref={ref}>
              <Comments inView={inView} />
            </div>
          )}
        </InView>
      </>}
    </>
  );
}

export default NewsDetail;
