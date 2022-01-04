import React, { useRef } from "react";
import "../FormStyles.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormikProvider, Form, ErrorMessage, useFormik } from "formik";
import {
  Form as FormBootstrap,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Alert,
  Container,
} from "react-bootstrap";
import {
  createActivity,
  updateActivity,
} from "../../Services/activitiesService";

const ActivitiesForm = ({ activityToEdit }) => {
  const isCreate = activityToEdit === undefined ? true : false;

  const fileInput = useRef();
  const descriptionInput = useRef();
  const initialValues = isCreate
    ? {
        name: "",
        image: "",
        description: "",
      }
    : activityToEdit;

  const handleErrors = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Por favor, ingrese un nombre.";
    }
    if (!values.image) {
      errors.image = "Por favor, ingrese una imagen.";
    }
    if (!values.description) {
      errors.description = "Por favor, ingrese una descripción.";
    }
    return errors;
  };

  function handleFileChange(e) {
    e.preventDefault();
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        formik.setFieldValue("image", reader.result, true);
        formik.validateField("image");
      };
      reader.onerror = (error) => {
        fileInput.current.value = "";
        formik.setFieldValue("image", "", true);
        formik.validateField("image");
        alert("No se pudo cargar el archivo de imagen. Error:" + error + ".");
      };
    } else {
      formik.setFieldValue("image", "", true);
      formik.validateField("image");
    }
  }

  function handleDescriptionChange(_, editor) {
    const data = editor.getData();
    formik.setFieldValue("description", data);
  }

  const handleSubmit = async (values, { resetForm }) => {
    const now = new Date();

    let fetchBody = {
      name: values.name,
      slug: "",
      image: values.image,
      description: values.description,
      created_at: isCreate ? now.toISOString() : initialValues.created_at,
      updated_at: now.toISOString(),
      id: isCreate ? 0 : activityToEdit.id,
      user_id: isCreate ? 0 : activityToEdit.user_id,
      category_id: isCreate ? 0 : activityToEdit.category_id,
      deleted_at: isCreate ? null : activityToEdit.deleted_at,
    };
    // I get a CORS ERROR when I try to send a post request
    if (isCreate) {
      createActivity(fetchBody);
    } else {
      updateActivity(initialValues.id, fetchBody);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validate: handleErrors,
  });

  return (
    <Container style={{ maxWidth: "30rem" }} className="card bg-light my-4">
      <h2 className="text-center p-3">Crear actividades</h2>
      <FormikProvider value={formik}>
        <Form className="p-3" encType="multipart/form-data">
          <FormGroup className="d-flex flex-column mb-3">
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <FormControl
              as={FormBootstrap.Control}
              id="name"
              name="name"
              type={"text"}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <FormBootstrap.Control.Feedback type="invalid">
              {formik.errors.name}
            </FormBootstrap.Control.Feedback>
          </FormGroup>

          <FormGroup className="d-flex flex-column mb-3">
            <FormLabel htmlFor="image">Imagen</FormLabel>
            <FormControl
              id="image"
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
              ref={fileInput}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.image && formik.errors.image}
            />
            <FormBootstrap.Control.Feedback type="invalid">
              {formik.errors.image}
            </FormBootstrap.Control.Feedback>
          </FormGroup>
          <FormGroup className="d-flex flex-column mb-3">
            <FormLabel htmlFor="description">Descripción</FormLabel>
            <FormControl
              as={CKEditor}
              id="description"
              name="description"
              editor={ClassicEditor}
              data={formik.values.description}
              ref={descriptionInput}
              onChange={handleDescriptionChange}
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-danger mt-1"
              style={{ fontSize: ".9rem" }}
            />
          </FormGroup>
          <Button type="submit" className="w-100">
            Enviar
          </Button>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default ActivitiesForm;
