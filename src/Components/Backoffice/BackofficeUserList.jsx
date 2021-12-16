import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import Header from "./Header";

function BackofficeUserList() {
  const [dataContact, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://ongapi.alkemy.org/api/users");
      setData(response.data.data);
    };
    getData();
  }, []);

  return (
    <Container className="d-flex flex-column">
      {dataContact.length === 0 ? (
        <Spinner animation="border" className="text-center" />
      ) : (
        <div className="row">
          <div className="col">
            <Header />
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
              {dataContact.map((data) => (
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
