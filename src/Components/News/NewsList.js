import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Button, Col, Table, Modal } from 'react-bootstrap';
import { TrashFill, PencilFill } from 'react-bootstrap-icons';

const NewsList = () => {
  const [modalImg, setModalImg] = useState({});

  const newsMock = [
    {
      id: 1,
      name: 'Titulo de prueba 1',
      image:
        'http://www.w-h-p-h.com/wp-content/uploads/2016/06/Test-Cover-01.jpg',
      createdAt: '17/11/21',
    },
    {
      id: 2,
      name: 'Titulo de prueba 2',
      image:
        'http://www.w-h-p-h.com/wp-content/uploads/2016/06/Test-Cover-02.jpg',
      createdAt: '18/11/21',
    },
    {
      id: 3,
      name: 'Titulo de prueba 3',
      image:
        'http://www.w-h-p-h.com/wp-content/uploads/2016/06/Test-Cover-03.jpg',
      createdAt: '19/12/21',
    },
    {
      id: 4,
      name: 'Titulo de prueba 4',
      image:
        'http://www.w-h-p-h.com/wp-content/uploads/2016/06/Test-Cover-04.jpg',
      createdAt: '20/12/21',
    },
  ];

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
    alert('direcciona a formulario de edicion');
  };

  const RemoveNew = () => {
    alert('elimina la novedad');
  };

  return (
    <Container fluid>
      <Row>
        <h1 className='text-center mt-4 mb-4'>Listado de Novedades</h1>
        <Col>
          <Button
            className='mt-4 mb-4'
            as={Link}
            to={`/backoffice/news/create`}
          >
            Crear Novedad
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table hover striped bordered className='align-middle'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>createdAt</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsMock.length > 0 ? (
                newsMock.map((element) => {
                  return (
                    <tr>
                      <td>{element.name}</td>
                      <td>
                        <Button
                          variant='link'
                          onClick={() => openModalImg(element.image)}
                        >
                          Ver imagen
                        </Button>
                      </td>
                      <td>{element.createdAt}</td>
                      <td>
                        {' '}
                        <div className='d-flex justify-content-around gap-1'>
                          <Button
                            variant='outline-primary'
                            onClick={toEditForm}
                          >
                            <PencilFill />
                          </Button>
                          <Button variant='outline-danger' onClick={RemoveNew}>
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
          {' '}
          <img src={modalImg.src} alt='detail' width='100%' />{' '}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={closeModalImg}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewsList;
