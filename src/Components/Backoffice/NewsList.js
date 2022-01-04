import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Button, Col, Table, Modal } from "react-bootstrap";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../features/news/newsReducer";

const NewsList = () => {
  const [modalImg, setModalImg] = useState({});
  const { _loading, news, _error } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    news.length === 0 && dispatch(getNews());
  }, [dispatch]);

  const openModalImg = (src, name) => {
    setModalImg({
      open: true,
      src: src,
    });
  };

  const closeModalImg = () => {
    setModalImg({
      open: false,
    });
  };

  const toEditForm = () => {
    alert("direcciona a formulario de edicion");
  };

  const RemoveNew = () => {
    alert("elimina la novedad");
  };

  const parseDate = (isoDate) => {
    const date = new Date(isoDate); // ISO 8601 date string to Date object
    return date.toLocaleDateString("en-GB"); // returns a string like 'dd/mm/yyyy'
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>Listado de Novedades</h3>
          <Button className="mb-3" as={Link} to={`/newsform`}>
            Crear Novedad
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table hover striped bordered className="align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>createdAt</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.length > 0 ? (
                news.map(({ id, name, image, created_at }) => {
                  const parsedDate = parseDate(created_at);
                  return (
                    <tr key={id.toString()}>
                      <td>{name}</td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => openModalImg(image)}
                        >
                          Ver imagen
                        </Button>
                      </td>
                      <td>{parsedDate}</td>
                      <td>
                        <div className="d-flex justify-content-around gap-1">
                          <Button
                            variant="outline-primary"
                            onClick={toEditForm}
                          >
                            <PencilFill />
                          </Button>
                          <Button variant="outline-danger" onClick={RemoveNew}>
                            <TrashFill />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}> No hay novedades</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={modalImg.open} onHide={closeModalImg}>
        <Modal.Body>
          <img src={modalImg.src} alt="detail" width="100%" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModalImg}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewsList;
