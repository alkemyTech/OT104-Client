import React, { useEffect } from "react";
import { Button, Table, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/backOfficeUsers/backOfficeUsersSlice";

function BackofficeUserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsers());
  });

  return (
    <Container className="d-flex flex-column">
      {users.length === 0 ? (
        <Spinner animation="border" className="text-center" />
      ) : (
        <div className="row">
          <div className="col">
            <h3>Usuarios</h3>
            <Button as={Link} to="/backoffice/users/create" className="mb-3">
              Nuevo usuario
            </Button>
          </div>

          <Table striped bordered hover className="align-middle">
            <thead>
              <tr>
                <th className="text-center">Nombre:</th>
                <th className="text-center">Email:</th>
                <th className="text-center">Acciones:</th>
              </tr>
            </thead>
            <tbody>
              {users.map((data) => (
                <tr key={data.id}>
                  <td className="text-center">{data.name}</td>
                  <td className="text-center">{data.email}</td>
                  <td className="d-flex justify-content-center gap-1">
                    <button className="btn btn-outline-danger" title="Eliminar">
                      <TrashFill />
                    </button>

                    <button className="btn btn-outline-primary" title="Editar">
                      <PencilFill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default BackofficeUserList;
