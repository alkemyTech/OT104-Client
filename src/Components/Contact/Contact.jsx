import React, { useState, useEffect } from "react";
import { Spinner, Container, Table, Breadcrumb } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/contact.css";
import contactService from "../../Services/contactService";

function Contact() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      let res = await contactService.get();
      setData(res.data.data);
    })();
  }, []);

  return (
    <Container className="d-flex flex-column">
      {data.length === 0 ? (
        <Spinner animation="border" className="text-center" />
      ) : (
        <div className="row">
          <h1 className="text-center">Contacto</h1>
          {/* {This title is generate byTitle component} */}
          <Table striped bordered hover className="align-middle">
            <thead>
              <tr>
                <th className="text-center">Nombre:</th>
                <th className="text-center">Email:</th>
                <th className="text-center">Telefono:</th>
              </tr>
            </thead>
            <tbody>
              {data.map((infoContact) => (
                <tr key={infoContact.id}>
                  <td className="text-center">{infoContact.name}</td>
                  <td className="text-center">{infoContact.email}</td>
                  <td className="text-center">{infoContact.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default Contact;
