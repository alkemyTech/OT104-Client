import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { InView } from "react-intersection-observer";
import Spinner from "./../../Spinner/Spinner";
import Title from "./../../Title/Title";
import Comments from "./Comments";
import "./styles/cardnew.css";
import { alertServiceError } from "../../Alert/AlertService";
import { getRequest } from "../../../Services/privateApiService";

function NewsDetail(props) {
  const [news, setNews] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = props.match.params.id;
  const history = useHistory();

  useEffect(() => {
    (async () => {
      let res = await getRequest(process.env.REACT_APP_URL_GET_NEWS + `/${id}`);
      setNews(res.data.data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {error && alertServiceError("Error", "No se pudo cargar esta noticia")}
      {news && (
        <>
          <Container>
            <Row className="m-3 border text-center">
              <Col md={4}>
                <Card.Img className="p-1" variant="top" src={news.image} />
              </Col>
              <Col md={8} className="p-3">
                <h2 className="m3-2">{news.name}</h2>
                <ul className="list-unstyled">
                  <li></li>
                  <li>
                    <span
                      dangerouslySetInnerHTML={{ __html: news.content }}
                    ></span>
                  </li>
                  <li>
                    <Button onClick={() => history.push("/novedades")}>
                      Volver
                    </Button>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>

          {/* InView component render it childrens when the element is in viewport */}
          <InView>
            {({ inView, ref }) => (
              <div ref={ref}>
                <Comments inView={inView} />
              </div>
            )}
          </InView>
        </>
      )}
    </>
  );
}

export default NewsDetail;
