import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Container, Modal } from "react-bootstrap";
import slidesService from "./../../Services/slidesService";
import Header from "./Header";

const SlidesList = () => {
  const [slides, setSlides] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [imagePath, setImagePath] = useState("");

  function handleShowImage(e) {
    e.preventDefault();
    setImagePath(e.target.id);
    setShowImage(true);
  }

  function handleCloseImage() {
    setImagePath("");
    setShowImage(false);
  }

  function handleOpenDelete() {
    setShowDelete(true);
  }

  function handleCloseDelete() {
    setShowDelete(false);
  }

  useEffect(() => {
    const getSlides = async () => {
      const slides = await slidesService.getAll();
      setSlides(slides.data.data);
    };
    getSlides();
  }, []);

  return (
    <Container>
      <Header />
      <h3>Slides</h3>
      <Button as={Link} className="mb-3" to="/backoffice/slides/create">
        Crear Slide
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Imagen</th>
            <th>Orden</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {slides.length !== 0 &&
            slides.map((slide) => (
              <tr key={slide.id}>
                <td>{slide.name}</td>
                <td>
                  <Button
                    id={slide.image}
                    onClick={handleShowImage}
                    variant="link"
                  >
                    {slide.image}
                  </Button>
                </td>
                <td>{slide.order}</td>
                <td className="d-flex justify-content-center">
                  <div
                    className="text-center d-grid gap-1"
                    style={{ gridTemplateColumns: "min-content min-content" }}
                  >
                    <Button onClick={handleOpenDelete} variant="outline-danger">
                      <i className="bi bi-trash" />
                    </Button>
                    <Button variant="outline-primary">
                      <i className="bi bi-pencil" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal show={showImage} onHide={handleCloseImage}>
        <img src={imagePath} />
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar Imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea borrar esta imagen?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Sí
          </Button>
          <Button variant="primary" onClick={handleCloseDelete}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SlidesList;
