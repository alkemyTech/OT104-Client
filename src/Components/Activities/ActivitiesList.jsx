import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { Pencil, Trash } from 'react-bootstrap-icons';

const getActivities = async () => {
  try {
    let res = await axios.get('http://ongapi.alkemy.org/api/activities');
    console.log(res.data.message);
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};

const ActivitiesList = () => {
  const [activities, setActivities] = useState({
    isLoading: true,
  });
  const [modalDetail, setModalDetail] = useState({});
  const [modalDelete, setModalDelete] = useState({});

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
      src: '',
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
    (async () => {
      try {
        let data = await getActivities();
        setActivities({
          isLoading: false,
          data: data,
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Breadcrumb className='mt-3'>
            <Breadcrumb.Item as={Link} to='/backoffice'>
              Backoffice
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Activities</Breadcrumb.Item>
          </Breadcrumb>
          <h3 className='mb-3'>List of activities</h3>
          <Button as={Link} to='/backoffice/activities/create' className='mb-3'>
            New Activity
          </Button>
        </Col>
      </Row>
      {activities.isLoading ? (
        <Row>
          <Col>
            <Spinner
              animation='border'
              role='status'
              className='d-block mx-auto'
              variant='primary'
            >
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Table hover striped bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Created At</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.data ? (
                  activities.data.map((activity) => (
                    <tr>
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
                          <Pencil />
                        </Button>
                        <Button
                          variant='outline-danger'
                          onClick={() =>
                            openModalDelete(activity.name, activity.id)
                          }
                        >
                          <Trash />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      Do you want to add a{' '}
                      <Link to='/backoffice/activities/create'>
                        new activity
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
          <Modal.Title>Delete Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure to delete the{' '}
            <span className='fw-bold'>{modalDelete.name}</span> activity? This
            action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModalDelete}>
            Close
          </Button>
          <Button
            variant='danger'
            onClick={() => deleteActivity(modalDelete.id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ActivitiesList;
