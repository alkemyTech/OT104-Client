import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../features/auth/authReducer";
import axios from "axios";
import { useHistory } from "react-router";
import { Form as FormBootstrap, Container, Button } from "react-bootstrap";
import Title from "../Title/Title";

function LoginForm() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  const dispatch = useDispatch();
  const logInAuth = async (data) => {
    dispatch(login({ email: data.emailUser, password: data.passwordUser }));
  };

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth]);

  return (
    <div>
      <Title> Ingresar </Title>
    <Container style={{ maxWidth: "30rem" }} className="card bg-light my-2">
      <Formik
        initialValues={{
          emailUser: "",
          passwordUser: "",
        }}
        validate={(data) => {
          let err = {};
          if (!data.emailUser) {
            err.emailUser = "El email es requerido";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              data.emailUser
            )
          ) {
            err.emailUser = "El email no es válido";
          }

          if (!data.passwordUser) {
            err.passwordUser = "La contraseña es requerida";
          } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
              data.passwordUser
            )
          ) {
            err.passwordUser = "La contraseña no es válida";
          }

          return err;
        }}
        onSubmit={(data, { resetForm }) => {
          setTimeout(() => {
          resetForm();
          logInAuth(data);
          }, 1000);
        }}
      >
        {({ errors, touched, isSubmitting}) => (
          <Form className="p-3">
            <FormBootstrap.Group className="d-flex flex-column mb-3">
              <FormBootstrap.Label htmlFor="username">Correo electrónico</FormBootstrap.Label>
              <Field
                as={FormBootstrap.Control}
                type="text"
                id="username"
                name="emailUser"
                placeholder="Correo electrónico"
                isInvalid={touched.emailUser && errors.emailUser}
              />
              <FormBootstrap.Control.Feedback type="invalid">
                {errors.emailUser}
              </FormBootstrap.Control.Feedback>
            </FormBootstrap.Group>

            <FormBootstrap.Group className="d-flex flex-column mb-3">
              <FormBootstrap.Label htmlFor="password">Contraseña</FormBootstrap.Label>
              <Field
                as={FormBootstrap.Control}
                type="password"
                id="password"
                name="passwordUser"
                placeholder="Escriba su contraseña"
                isInvalid={touched.passwordUser && errors.passwordUser}
              />
              <FormBootstrap.Control.Feedback type="invalid">
                {errors.passwordUser}
              </FormBootstrap.Control.Feedback>
            </FormBootstrap.Group>
            <Button type="submit" disabled={isSubmitting && true}>
              {isSubmitting ? "Enviando" : "Enviar"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
    </div>
  );
}

export default LoginForm;
