import React, { useState } from "react";
import { Formik } from "formik";
import { Container, Row, Form, Button, Modal, Stack } from "react-bootstrap";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";
import { alertServiceError } from "../Alert/AlertService";
import pdf from "./terminos-y-condiciones.pdf";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authReducer";
const RegisterForm = () => {
  const [show, setShow] = useState(false);
  const [terms, setTerms] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const dispatch = useDispatch();
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
          errors.name = "Por favor ingrese un nombre";
        }

        //Validacion last nambre
        if (!values.lastName) {
          errors.lastName = "Por favor ingrese un apellido";
        }

        //Validacion email
        if (!values.email) {
          errors.email = "Por favor ingrese un email";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
        ) {
          errors.email =
            "El email sólo puede contener letras, números, puntos, guiones y guion bajo";
        }

        //Validacion password
        if (!values.password) {
          errors.password = "Por favor ingrese una contraseña";
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
          errors.repassword = "Por favor confirme tu contraseña";
        } else if (values.repassword !== values.password) {
          errors.repassword = "Las contraseñas no coinciden";
        }

        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        var userInfo = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        const postData = async (data) => {
          const res = await dispatch(register(data));
          if (res.payload.success) {
            alert("Usuario registrado con éxito");
          } else {
            alertServiceError(
              "Algo anda mal",
              "La petición no se pudo completar"
            );
          }
        };
        postData(userInfo);
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
        <Container style={{ maxWidth: "30rem" }} className="card bg-light my-2">
          <Row>
            <h2 className="mt-3 text-center">Formulario de registro</h2>
            <Form className="p-3" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  autoFocus
                  value={values.name}
                  placeholder="Ingrese su nombre"
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
                <Form.Label htmlFor="lastName">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={values.lastName}
                  placeholder="Ingrese su apellido"
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
                <Form.Label htmlFor="email">Correo</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  id="email"
                  value={values.email}
                  placeholder="Ingrese su correo"
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
                <Form.Label htmlFor="password">Contraseña</Form.Label>
                <Form.Control
                  type="text"
                  id="password"
                  name="password"
                  value={values.password}
                  placeholder="Ingrese su contraseña"
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
                <Form.Label htmlFor="passwordConfirm">
                  Confirme su contraseña
                </Form.Label>
                <Form.Control
                  type="text"
                  name="repassword"
                  id="passwordConfirm"
                  value={values.repassword}
                  placeholder="Confirme su contraseña"
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
                <Button variant="secondary" onClick={handleShow}>
                  Terminos y Condiciones
                </Button>

                {!terms && (
                  <div className="text-danger">
                    Debes leer y aceptar los términos y condiciones
                  </div>
                )}

                <Button
                  className="submit-btn"
                  type="submit"
                  disabled={!isValid}
                >
                  Registrarme
                </Button>
              </Stack>
            </Form>
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
