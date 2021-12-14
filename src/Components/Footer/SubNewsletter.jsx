import React from "react";
import { useFormik, FormikProvider, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import { Container, Form, Button, Row} from "react-bootstrap";

export default function SubNewsletter() {
  const subscribed = localStorage.getItem("subscribed");
  const initialValues = {
    name: "",
    email: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Requerido"),
    email: Yup.string()
      .email("Dirección de email no válida")
      .required("Requerido"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    localStorage.setItem("subscribed", JSON.stringify(values));

    alert("Gracias por suscribirte!");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  if (subscribed) {
    return null;
  }

  return (
    <Container style={{ maxWidth: "30rem" }} className="card bg-light">

      <Row className="text-center card-header">
        <h3>Somos Mas Newsletter</h3>
        <p>
          Para recibir nuestro Newsletter e información de nuestras actividades,
          suscríbete a nuestra lista de correos.
        </p>
      </Row>
      <FormikProvider value={formik}>
        <FormikForm className="text-center p-3">
          <Form.Group className="mb-3">
            <Field
              as={Form.Control}
              type="text"
              name="name"
              placeholder="Nombre"
              isInvalid={formik.touched.name && formik.errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Field
              as={Form.Control}
              type="email"
              name="email"
              placeholder="E-mail"
              isInvalid={formik.touched.email && formik.errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Suscribirse</Button>
        </FormikForm>
      </FormikProvider>

    </Container>
  );
}
