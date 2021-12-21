import React, { useState } from "react";
import { Formik } from "formik";
import {
  Container,
  Row,
  Form,
  Button,
  Col,
  Modal,
  Stack,
} from "react-bootstrap";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import pdf from "./terminos-y-condiciones.pdf";

const RegisterForm = () => {
  const [show, setShow] = useState(false);
  const [terms, setTerms] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const handleShow = () => setShow(true);
  const handleCancel = () => {
    setShow(false);
    setTerms(false);
  };
  const handleAcept = () => {
    setShow(false);
    setTerms(true);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Formik
      initialValues={{
        name: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
      }}
      validate={(values) => {
        let errors = {};

        //Validacion nombre
        if (!values.name) {
          errors.name = "Por favor ingresa un nombre";
        }

        //Validacion last nambre
        if (!values.lastName) {
          errors.lastName = "Por favor ingresa un apellido";
        }

        //Validacion email
        if (!values.email) {
          errors.email = "Por favor ingresa un email";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
        ) {
          errors.password =
            "El email solo puede contener letras, numeros, puntos, guiones y guion bajo";
        }

        //Validacion password
        if (!values.password) {
          errors.password = "Por favor ingresa una contraseña";
        } else if (
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
            values.password
          )
        ) {
          errors.password =
            "La contraseña debe tener una longitud mínima de 6 caraceteres, y contener al menos un número, una letra y un símbolo";
        }

        //Validacion repassword
        if (!values.repassword) {
          errors.repassword = "Por favor ingresa confirma tu contraseña";
        } else if (values.repassword !== values.password) {
          errors.repassword = "Las contraseñas no coinciden";
        }

        if (terms == null) {
          errors.terms = "Debes leer los terminos y condiciones";
        }

        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        var userInfo = {
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };

        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <Container>
          <Row>
            <Col xs lg="5 mx-auto">
              <h2 className="mt-3 text-center">Register Form</h2>
              <Form
                className="border border-grey rounded p-4 mt-4"
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    placeholder="Enter name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && errors.name}
                  />
                </Form.Group>
                {touched.name && errors.name && (
                  <div className="text-danger mb-3">{errors.name}</div>
                )}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    placeholder="Enter last name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={touched.lastName && errors.lastName}
                  />
                </Form.Group>
                {touched.lastName && errors.lastName && (
                  <div className="text-danger mb-3">{errors.lastName}</div>
                )}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    placeholder="Enter email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                  />
                </Form.Group>
                {touched.email && errors.email && (
                  <div className="text-danger mb-3">{errors.email}</div>
                )}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="password"
                    value={values.password}
                    placeholder="Enter password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && errors.password}
                  />
                </Form.Group>
                {touched.password && errors.password && (
                  <div className="text-danger mb-3">{errors.password}</div>
                )}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="repassword"
                    value={values.repassword}
                    placeholder="Confirm password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    isValid={touched.repassword && !errors.repassword}
                    isInvalid={touched.repassword && errors.repassword}
                  />
                </Form.Group>
                {touched.repassword && errors.repassword && (
                  <div className="text-danger mb-3">{errors.repassword}</div>
                )}
                <Stack gap={2}>
                  <Button variant="danger" onClick={handleShow}>
                    Terminos y Condiciones
                  </Button>

                  {terms == null && (
                    <div className="text-danger">{errors.terms}</div>
                  )}

                  {terms == false && (
                    <div className="text-danger">
                      Debes aceptar los terminos y condiciones
                    </div>
                  )}
                  <Button className="submit-btn" type="submit">
                    Register
                  </Button>
                </Stack>
              </Form>
            </Col>
          </Row>

          <Modal show={show} animation={false} size="lg" scrollable={true}>
            <Modal.Header closeButton onClick={handleCancel}>
              <Modal.Title>Terminos y condiciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleAcept}>
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </Formik>
  );
};

export default RegisterForm;
