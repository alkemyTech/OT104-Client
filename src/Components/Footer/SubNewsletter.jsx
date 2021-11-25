import React from "react";
import { useFormik, FormikProvider, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./SubNewsletter.module.css";

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
    localStorage.setItem("subscribed", true);

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Somos Mas Newsletter</h3>
        <p className={styles.paragraph}>
          Para recibir nuestro Newsletter e información de nuestras actividades,
          suscríbete a nuestra lista de correos.
        </p>
      </div>
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <Field
              type="text"
              name="name"
              className={`${styles.input} ${
                formik.touched.name && formik.errors.name && styles.inputError
              }`}
              placeholder="Nombre"
              required
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.msgError}
            />
          </div>
          <div className={styles.formGroup}>
            <Field
              type="email"
              name="email"
              className={`${styles.input} ${
                formik.touched.email && formik.errors.email && styles.inputError
              }`}
              placeholder="E-mail"
              required
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.msgError}
            />
          </div>
          <button type="submit" className={styles.btnSubmit}>
            Suscribirse
          </button>
        </Form>
      </FormikProvider>
    </div>
  );
}
