import React, {useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormLabel, FormControl, Button, Alert, Container } from "react-bootstrap";
import contactService from "../../Services/contactService";
import { fetchOrgData } from "../../features/about/aboutReducer";
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const position = useSelector(state => state.about.orgData.address);

  useEffect(() => {
    dispatch(fetchOrgData());
  }, [dispatch]);


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
    <Container
      className="d-flex flex-column justify-content-center text-center p-3"
    >
    <h1 className="p-3">Contacto</h1> 
    {position  && <MapContainer
        center={JSON.parse(position)}
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: "450px", width: "50%", margin: "auto" }}
     >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
            position={JSON.parse(position)}
            >
        </Marker>
    </MapContainer>}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={handleErrors}
      >
        {({ errors, values, handleChange, handleBlur }) => (
          <Form
              className="mt-4 d-flex flex-column mx-auto"
              style={{width: "50%"}}
          >
            <div>
              <FormLabel for="name">Nombre:</FormLabel>
              <Field
                name="name"
                type="text"
                render={() => (
                  <FormControl
                    className="mb-1"
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
              <FormLabel for="email">E-mail:</FormLabel>
              <Field
                name="email"
                type="text"
                render={() => (
                  <FormControl
                    className="mb-1"
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
              <FormLabel for="phone">Teléfono:</FormLabel>
              <Field
                name="phone"
                type="number"
                render={() => (
                  <FormControl
                    className="mb-1"
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
              <FormLabel for="message">Mensaje:</FormLabel>
              <Field
                name="message"
                as="textarea"
                render={() => (
                  <FormControl
                    className="mb-1"
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
            <Button type="submit" className="btn btn-secondary">Enviar Mensaje</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ContactForm;
