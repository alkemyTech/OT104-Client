import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormLabel, FormControl, Button, Alert } from "react-bootstrap";
import contactService from "../../Services/contactService";

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  function handleSubmit(values) {
    contactService.create(values);
  }

  function handleErrors(values) {
    let errors = {};
    if (!values.name) {
      errors.name = "Por favor ingresa un nombre para continuar.";
    }
    if (!values.email) {
      errors.email = "Por favor ingresa un email para continuar.";
    } else {
      const mailRegExp = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}/;
      if (!mailRegExp.test(values.email)) {
        errors.email = "Por favor, ingresa un email con un formato válido.";
      }
    }
    if (!values.message) {
      errors.message = "Por favor ingresa un mensaje para continuar.";
    }
    if (!values.phone) {
      errors.phone = "Por favor ingresa un teléfono para continuar.";
    } else {
      if (typeof values.phone !== "number") {
        errors.phone = "El teléfono ingresado solamente puede ser un número.";
      } else {
        if (values.phone.toString().length < 8) {
          errors.phone =
            "Por favor ingresa como teléfono un número de al menos 8 cifras.";
        }
      }
    }

    return errors;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={handleErrors}
    >
      {({ errors, values, handleChange, handleBlur }) => (
        <Form>
          <div>
            <FormLabel for="name">Nombre:</FormLabel>
            <Field
              name="name"
              type="text"
              render={() => (
                <FormControl
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              )}
            />
            <ErrorMessage
              name="name"
              component={() => <Alert variant="danger">{errors.name}</Alert>}
            />
          </div>
          <div>
            <label for="email">E-mail:</label>
            <Field
              name="email"
              type="text"
              render={() => (
                <FormControl
                  name="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              )}
            />
            <ErrorMessage
              name="email"
              component={() => <Alert variant="danger">{errors.email}</Alert>}
            />
          </div>
          <div>
            <label for="phone">Teléfono:</label>
            <Field
              name="phone"
              type="number"
              render={() => (
                <FormControl
                  name="phone"
                  type="number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              )}
            />
            <ErrorMessage
              name="phone"
              component={() => <Alert variant="danger">{errors.phone}</Alert>}
            />
          </div>
          <div>
            <label for="message">Mensaje:</label>
            <Field
              name="message"
              as="textarea"
              render={() => (
                <FormControl
                  name="message"
                  as="textarea"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              )}
            />
            <ErrorMessage
              name="message"
              component={() => <Alert variant="danger">{errors.message}</Alert>}
            />
          </div>
          <Button type="submit">Enviar Mensaje</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
