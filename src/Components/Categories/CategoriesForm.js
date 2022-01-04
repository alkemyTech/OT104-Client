import React from "react";
import { useHistory } from "react-router-dom";
import "../FormStyles.css";
import Title from "./../Title/Title";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import categoryService from "../../Services/categoriesService";

// React Bootstrap
import { Form, Container, Button } from "react-bootstrap";

const CategoriesForm = ({ location }) => {
  const history = useHistory();
  const cateroryToEdit = location.state?.categoryToEdit;
  const [category, setCategory] = React.useState({});
  const [imageState, setImageState] = React.useState(null);
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    description: "",
    image: "",
  });

  React.useEffect(() => {
    if (cateroryToEdit) {
      setCategory(cateroryToEdit);
      setInitialValues({ ...cateroryToEdit });
    }
  }, []);

  const convertToBase64Handler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageState(reader.result);
    };
  };

  const validateYupSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "El título debe tener al menos 4 caracteres")
      .required("El nombre es requerido"),
    description: Yup.string()
      .min(1, "La descripción debe tener al menos 1 caracter")
      .required("La descripción es requerida"),
  });

  const ConditionalForm = () => {
    return (
      <Container style={{ maxWidth: "30rem" }} className="card bg-light my-2">
        {cateroryToEdit ? (
          <Title>Editar Categoria</Title>
        ) : (
          <Title>Crear Categoria</Title>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validateYupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            if (category.id) {
              const valuesToEdit = { ...values };
              delete valuesToEdit.image;
              const res = await categoryService.update(
                category.id,
                valuesToEdit
              );
              if (res.status === 200) {
                alert("Categoría actualizada");
              }
              history.push("/backoffice/categories");
            } else {
              const res = await categoryService.create(values);
              if (res.status === 200) {
                alert("Categoría creada con éxito");
              }
              history.push("/backoffice/categories");
            }

            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            (values.image = imageState),
            (
              <Form noValidate onSubmit={handleSubmit} className="p-3">
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Field
                    as={Form.Control}
                    className="input-field"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <CKEditor
                    name="description"
                    editor={ClassicEditor}
                    data={values.description}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      // this pass the data to the formik
                      values.description = data;
                    }}
                    onBlur={(event, editor) => {}}
                    onFocus={(event, editor) => {}}
                  />

                  {errors.description &&
                    touched.description &&
                    errors.description && (
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-danger mt-1"
                        style={{ fontSize: ".9rem" }}
                      />
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    className="input-field"
                    type="file"
                    name="image"
                    accept=".jpg,.jpeg,.png"
                    onChange={convertToBase64Handler}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            )
          )}
        </Formik>
      </Container>
    );
  };

  return cateroryToEdit ? <ConditionalForm /> : <ConditionalForm />;
};

export default CategoriesForm;
