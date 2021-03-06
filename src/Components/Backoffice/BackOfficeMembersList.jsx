import React, { useState, useEffect } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import axios from "axios";
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
import { getMembers } from "../../features/backoffice_members/backofficeMembersReducer";
import { useHistory } from "react-router";

const BackOfficeMembersList = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { members, loading, _error } = useSelector((state) => state.members);
  const history = useHistory();

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  const [modalDetail, setModalDetail] = useState({});
  const [modalDelete, setModalDelete] = useState({});
  const deleteMember = (id) => {
    axios
      .delete(`http://ongapi.alkemy.org/api/members/${id}`)
      .then((response) => {
        setMessage("Miembro eliminado correctamente.");
        setTimeout(() => {
          setMessage("");
        }, 4000);
      });
    closeModalDelete();
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

  return (
    <Container fluid>
      <BrowserRouter>
        <Row>
          <Col>
            <h3>Listado de miembros</h3>
            <Button 
              className="mb-3"
              onClick={() => { history.push("/backoffice/members/create") }}
            >
              Nuevo miembro
            </Button>
          </Col>
        </Row>
        {loading ? (
          <Row>
            <Col>
              <Spinner
                animation="border"
                role="status"
                className="d-block mx-auto"
                variant="primary"
              >
                <span className="visually-hidden">Cargando miembros...</span>
              </Spinner>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <Table hover striped bordered className="align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {members.length > 0 ? (
                    members.map((member) => (
                      <tr key={member.id}>
                        <td>{member.name}</td>
                        <td>
                          <Button
                            variant="link"
                            className="text-decoration-none text-primary"
                            onClick={() => openModalDetail(member.image)}
                          >
                            Ver Imagen
                          </Button>
                        </td>
                        <td className="d-flex justify-content-around gap-1">
                          <Button
                            as={Link}
                            to="./MembersForm"
                            member={member.id}
                            variant="outline-primary"
                          >
                            <PencilFill />
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() =>
                              openModalDelete(member.name, member.id)
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
                        Do you want to add a{" "}
                        <Link to="./MembersForm">new member</Link>?
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
          size="lg"
          show={modalDetail.open}
          onHide={closeModalDetail}
        >
          <Modal.Header closeButton />
          <Modal.Body>
            <img src={modalDetail.src} alt="detail" width="100%" />
          </Modal.Body>
        </Modal>
        <Modal centered show={modalDelete.open} onHide={closeModalDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar miembro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              ??Est??s seguro que quieres eliminar a{" "}
              <span className="fw-bold">{modalDelete.name}</span>? Esta acci??n
              no se puede deshacer.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalDelete}>
              Cerrar
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteMember(modalDelete.id)}
            >
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </BrowserRouter>
      {message && <p className="text text-danger m-auto">{message}</p>}
    </Container>
  );
};

export default BackOfficeMembersList;
