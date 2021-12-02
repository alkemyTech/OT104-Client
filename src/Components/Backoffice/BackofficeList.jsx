import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
function BackofficeList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://ongapi.alkemy.org/api/users?limit=10"
      );
      setUsers(response.data.data);
    };
    getData();
  }, []);

  return (
    <Container className="d-flex justify-content-center flex-wrap">
      <Container className="m-1 text-center">
        <Link to="/backoffice/users/create">
          <Button>Crear Usuario</Button>
        </Link>
      </Container>
      {users.length === 0 ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th className="text-center">Nombre</th>
                <th className="text-center">Email</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{data.name}</td>
                    <td className="text-center">{data.email}</td>
                    <td className="text-center">
                      <Container>
                        <Button variant="primary" className="m-1">
                          Editar
                        </Button>
                        <Button variant="danger">Eliminar</Button>
                      </Container>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default BackofficeList;
