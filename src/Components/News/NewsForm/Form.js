import React, { useState, useEffect } from "react";
import { ErrorMessage, Form, Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form as FormBootstrap, Container, Button } from "react-bootstrap";
import categoriesService from "./../../../Services/categoriesService";

const NewsForm = ({ newToEdit, edit, onSubmit }) => {
  const [imgPreview, setImgPreview] = useState("");
  const [imageState, setImageState] = useState("");
  const [categories, setCategories] = useState([]);
  const initialValues = {
    name: newToEdit?.name || "",
    image: newToEdit?.image || "",
    content: newToEdit?.content || "",
    category: newToEdit?.category || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "El título debe tener al menos 4 caracteres")
      .required("El titulo es requerido"),
    image: Yup.string().required("La imagen es requerida"),
    content: Yup.string().required("El contenido es requerido"),
    category: Yup.string().required("La categoría es requerida"),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getAll();
        setCategories(response.data.data);
      } catch (error) {
        return error;
      }
    };
    fetchCategories();

    if (initialValues.image !== "") {
      setImgPreview(initialValues.image);
      setImageState(initialValues.image);
    }
  }, [initialValues.image]);

  // handle image change in formik state
  useEffect(() => {
    formik.setFieldValue("image", imageState);
  }, [imageState]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setImageState(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (_, editor) => {
    const data = editor.getData();
    formik.setFieldValue("content", data);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Container style={{ maxWidth: "30rem" }} className="card bg-light my-2">
      <FormikProvider value={formik}>
        <Form className="p-3" data-testid="form-element">
          <FormBootstrap.Group className="d-flex flex-column mb-3">
            <FormBootstrap.Label htmlFor="name">Título</FormBootstrap.Label>
            <Field
              data-testid="title-element"
              as={FormBootstrap.Control}
              type="text"
              name="name"
              placeholder="Título"
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <FormBootstrap.Control.Feedback type="invalid">
              {formik.errors.name}
            </FormBootstrap.Control.Feedback>
          </FormBootstrap.Group>

          <FormBootstrap.Group className="d-flex flex-column mb-3">
            <FormBootstrap.Label htmlFor="image">Imagen</FormBootstrap.Label>
            {imgPreview && <img src={imgPreview} alt="preview" />}
            <FormBootstrap.Control
              data-testid="image-element"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              isInvalid={formik.touched.image && formik.errors.image}
            />
            <FormBootstrap.Control.Feedback type="invalid">
              {formik.errors.image}
            </FormBootstrap.Control.Feedback>
          </FormBootstrap.Group>

          <FormBootstrap.Group className="d-flex flex-column mb-3">
            <FormBootstrap.Label htmlFor="content">
              Contenido
            </FormBootstrap.Label>
            <FormBootstrap.Control
              as={CKEditor}
              name="content"
              data={initialValues.content}
              editor={ClassicEditor}
              onChange={handleEditorChange}
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-danger mt-1"
              style={{ fontSize: ".9rem" }}
            />
          </FormBootstrap.Group>

          <FormBootstrap.Group className="d-flex flex-column mb-3">
            <FormBootstrap.Label htmlFor="category">
              Categoría
            </FormBootstrap.Label>

            <Field
              as={FormBootstrap.Select}
              name="category"
              data-testid="category-element"
              isInvalid={formik.touched.category && formik.errors.category}
            >
              <option value="" disabled>
                Seleccionar
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Field>

            <FormBootstrap.Control.Feedback type="invalid">
              {formik.errors.category}
            </FormBootstrap.Control.Feedback>
          </FormBootstrap.Group>

          <Button type="submit" disabled={formik.isSubmitting && true}>
            {formik.isSubmitting ? "Enviando" : "Enviar"}
          </Button>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default NewsForm;
