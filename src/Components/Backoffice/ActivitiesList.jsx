import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getActividades } from "../../features/activities/activitiesSlice";
import BackofficeLayout from './BackofficeLayout'

const ActivitiesList = () => {
  const activities = useSelector((state) => state.activities.data);
  const storeLoading = useSelector((state) => state.activities.status);
  const [modalDetail, setModalDetail] = useState({});
  const [modalDelete, setModalDelete] = useState({});
  const dispatch = useDispatch();

  const deleteActivity = (id) => {
    alert(id);
  };

  const openModalDetail = (src) => {
    setModalDetail({
      open: true,
      src: src,
    });
  };

  const closeModalDetail = () => {
    setModalDetail({
      open: false,
      src: "",
    });
  };

  const openModalDelete = (name, id) => {
    setModalDelete({
      open: true,
      name,
      id,
    });
  };

  const closeModalDelete = () => {
    setModalDelete({
      open: false,
    });
  };

  useEffect(() => {
    dispatch(getActividades());
  }, []);

  return (
    <BackofficeLayout>
      <Container fluid>
        <Row>
          <Col>
            <Breadcrumb className='mt-3'>
              <Link className='breadcrumb-item' to='/backoffice'>
                Backoffice
              </Link>
              <Breadcrumb.Item active>Activities</Breadcrumb.Item>
            </Breadcrumb>
            <h3 className='mb-3'>Listado de actividades</h3>
            <Button as={Link} to='/backoffice/activities/create' className='mb-3'>
              Nueva actividad
            </Button>
          </Col>
        </Row>
        {storeLoading == "pending" ? (
          <Row>
            <Col>
              <Spinner
                animation='border'
                role='status'
                className='d-block mx-auto'
                variant='primary'
              >
                <span className='visually-hidden'>Cargando...</span>
              </Spinner>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <Table hover striped bordered>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th>Creado el día</th>
                    <th className='text-center'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities ? (
                    activities.map((activity) => (
                      <tr key={activity.id.toString()}>
                        <td className='fw-bold align-middle'>{activity.name}</td>
                        <td>
                          <Button
                            variant='link'
                            onClick={() => openModalDetail(activity.image)}
                          >
                            Ver Imagen
                          </Button>
                        </td>
                        <td className='align-middle'>
                          {new Date(activity.created_at).toLocaleDateString()}
                        </td>
                        <td className='d-flex justify-content-around gap-1'>
                          <Button variant='outline-primary'>
                            <PencilFill />
                          </Button>
                          <Button
                            variant='outline-danger'
                            onClick={() =>
                              openModalDelete(activity.name, activity.id)
                            }
                          >
                            <TrashFill />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>
                        ¿Desea crear una{" "}
                        <Link to='/backoffice/activities/create'>
                          nueva actividad
                        </Link>
                        ?
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
        <Modal
          centered
          size='lg'
          show={modalDetail.open}
          onHide={closeModalDetail}
        >
          <Modal.Header closeButton />
          <Modal.Body>
            <img src={modalDetail.src} alt='detail' width='100%' />
          </Modal.Body>
        </Modal>
        <Modal centered show={modalDelete.open} onHide={closeModalDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Borrar Actividad</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              ¿Estas seguro que quieres eliminar la actividad{" "}
              <span className='fw-bold'>{modalDelete.name}</span>? Esta acción no
              se puede deshacer.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModalDelete}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => deleteActivity(modalDelete.id)}
            >
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </BackofficeLayout>
  );
};

export default ActivitiesList;
