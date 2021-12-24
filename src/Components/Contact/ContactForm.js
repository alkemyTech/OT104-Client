import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormLabel, FormControl, Button, Alert } from "react-bootstrap";
import {
  alertServiceError,
  alertServiceInfoTimer,
} from "../Alert/AlertService";
import contactService from "../../Services/contactService";

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = async (values) => {
    try {
      let res = await contactService.create(values);
      if (!res.data.success) {
        return alertServiceError(
          "Error",
          "Ocurrio un error al intentar guardar este contacto"
        );
      }
      return alertServiceInfoTimer("Exito", "Contacto guardado");
    } catch (err) {
      alertServiceError(
        "Error",
        "Ocurrio un error al intentar guardar este contacto"
      );
    }
  };

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
      {() => (
        <Form>
          <div>
            <FormLabel htmlFor="name">Nombre:</FormLabel>
            <Field id="name" name="name" type="text" as={FormControl} />
            <ErrorMessage name="name" variant="danger" component={Alert} />
          </div>
          <div>
            <FormLabel htmlFor="email">E-mail:</FormLabel>
            <Field id="email" name="email" type="text" as={FormControl} />
            <ErrorMessage name="email" variant="danger" component={Alert} />
          </div>
          <div>
            <FormLabel htmlFor="phone">Teléfono:</FormLabel>
            <Field id="phone" name="phone" type="number" as={FormControl} />
            <ErrorMessage name="phone" variant="danger" component={Alert} />
          </div>
          <div>
            <FormLabel htmlFor="message">Mensaje:</FormLabel>
            <Field id="message" name="message" as={FormControl} />
            <ErrorMessage name="message" variant="danger" component={Alert} />
          </div>
          <Button type="submit">Enviar Mensaje</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
