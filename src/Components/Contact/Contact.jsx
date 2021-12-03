import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Container } from "react-bootstrap";
import axios from "axios";
import "./styles/contact.css";
//import titleCOmponent from '...'

function Contact() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://ongapi.alkemy.org/api/contacts?limit=10"
      );
      setData(response.data.data);
    };
    getData();
  }, []);

  return (
    <Container id="contact-container">
      {/* This tittle ´s received by title component */}
      <Container className="text-center">
        <h1>Contacto</h1>
      </Container>
      {data.length === 0 ? (
        <Spinner animation="border" />
      ) : (
        <Container id="table-container">
          <Table>
            <thead>
              <tr>
                <th className="text-center">Nombre</th>
                <th className="text-center">Email</th>
                <th className="text-center">Telefono</th>
              </tr>
            </thead>
            <tbody>
              {data.map((infoContacto, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{infoContacto.name}</td>
                    <td className="text-center">{infoContacto.email}</td>
                    <td className="text-center">{infoContacto.phone}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      )}
    </Container>
  );
}

export default Contact;
