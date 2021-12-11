import React, { useState, useEffect } from 'react';
import Spinner from '../../Spinner/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const MockTitleComponent = ({ children }) => {
  return <h1 className='display-5'>{children}</h1>;
};

const ActivityDetail = ({ match }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const id = match.params.id;

  useEffect(() => {
    fetch(`http://ongapi.alkemy.org/api/activities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setTitle(data.data.name);
          setContent(data.data.description);
          setLoading(false);
        } else {
          setTitle('No encontrado');
          setContent('La actividad solicitada no existe o no está disponible.');
        }
      });
  }, []);

  return (
    <Container fluid>
      {!loading ? (
        <Row>
          <Col>
            <Spinner />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <MockTitleComponent>{title}</MockTitleComponent>
            <div>{content}</div>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default ActivityDetail;
