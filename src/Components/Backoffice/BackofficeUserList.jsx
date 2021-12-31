import React, { useEffect } from "react";
import { Button, Table, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/backOfficeUsers/backOfficeUsersSlice";
import userService from "../../Services/userService";
import {
  alertServiceError,
  alertServiceInfoTimer,
} from "../Alert/AlertService";

function BackofficeUserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const deleteUser = async (id) => {
    try {
      await userService.delete(id);
      dispatch(getUsers());
      alertServiceInfoTimer(
        "center",
        "success",
        "Usuario eliminado con exito."
      );
    } catch (err) {
      alertServiceError(
        "Error",
        "Ocurrio un error al intentar eliminar el usuario"
      );
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>Usuarios</h3>
          <Button as={Link} to="/create-user" className="mb-3">
            Nuevo usuario
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="table-responsive">
          {users.length === 0 ? (
            <Spinner animation="border" />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((data) => (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td className="d-flex justify-content-around gap-1">
                      <Button variant="outline-primary" as={Link}>
                        <PencilFill />
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteUser(data.id)}
                      >
                        <TrashFill />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default BackofficeUserList;
