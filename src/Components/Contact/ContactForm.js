import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  alertServiceError,
  alertServiceInfoTimer,
} from "../Alert/AlertService";
import {
  FormLabel,
  FormControl,
  Button,
  Alert,
  Container,
} from "react-bootstrap";
import contactService from "../../Services/contactService";
import { fetchOrgData } from "../../features/about/aboutReducer";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.about.orgData.address);

  useEffect(() => {
    dispatch(fetchOrgData());
  }, [dispatch]);

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
      return alertServiceInfoTimer(
        "center",
        "success",
        "Contacto guardado con exito"
      );
    } catch (err) {
      alertServiceError(
        "Error",
        "Ocurrio un error al intentar realizar la petición"
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
    <Container style={{ maxWidth: "30rem" }} className="card bg-light p-3 my-4">
      {<h3 className="text mt-4 text-center">Contacto</h3>}
      {position && (
        <MapContainer
          center={JSON.parse(position)}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "450px", width: "50%", margin: "auto" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={JSON.parse(position)}></Marker>
        </MapContainer>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={handleErrors}
      >
        {() => (
          <Form className="p-3">
            <div>
              <FormLabel className="mt-3" htmlFor="name">
                Nombre:
              </FormLabel>
              <Field id="name" name="name" type="text" as={FormControl} />
              <ErrorMessage name="name" variant="danger" component={Alert} />
            </div>
            <div>
              <FormLabel className="mt-3" htmlFor="email">
                E-mail:
              </FormLabel>
              <Field id="email" name="email" type="text" as={FormControl} />
              <ErrorMessage name="email" variant="danger" component={Alert} />
            </div>
            <div>
              <FormLabel className="mt-3" htmlFor="phone">
                Teléfono:
              </FormLabel>
              <Field id="phone" name="phone" type="number" as={FormControl} />
              <ErrorMessage name="phone" variant="danger" component={Alert} />
            </div>
            <div>
              <FormLabel className="mt-4" htmlFor="message">
                Mensaje:
              </FormLabel>
              <Field id="message" name="message" as={FormControl} />
              <ErrorMessage name="message" variant="danger" component={Alert} />
            </div>
            <Button
              className="mt-4 mb-3"
              style={{ width: "100%" }}
              variant="primary"
              type="submit"
            >
              Enviar Mensaje
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ContactForm;
