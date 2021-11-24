import React, { useState, useEffect } from "react";
import { ErrorMessage, Form, Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../../Components/FormStyles.css";

const categoriesEndPoint = [
  { id: "4sd6", name: "Categoria 1" },
  { id: "1sd7", name: "Categoria 2" },
  { id: "48e6", name: "Categoria 3" },
  { id: "6sd3", name: "Categoria 4" },
];
// const newToEdit = {
//   title: "Titulo",
//   image: "https://via.placeholder.com/150",
//   content: "<p>El cuerpo</p>",
//   category: "48e6",
// };

const NewsForm = ({ newToEdit = false }) => {
  const [imgPreview, setImgPreview] = useState("");
  const [imageState, setImageState] = useState("");
  const [categories, setCategories] = useState([]);
  const initialValues = {
    title: newToEdit.title || "",
    image: newToEdit.image || "",
    content: newToEdit.content || "",
    category: newToEdit.category || "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "El título debe tener al menos 4 caracteres")
      .required("El titulo es requerido"),
    image: Yup.string().required("La imagen es requerida"),
    content: Yup.string().required("El contenido es requerido"),
    category: Yup.string().required("La categoria es requerida"),
  });

  useEffect(() => {
    setCategories(categoriesEndPoint);
    if (initialValues.image !== "") {
      setImgPreview(initialValues.image);
      setImageState(initialValues.image);
    }
  }, [initialValues.image]);

  useEffect(() => {
    formik.setFieldValue("image", imageState);
  }, [imageState]);

  const handleFileChange = (e) => {
    setImageState(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleEditorChange = (_, editor) => {
    const data = editor.getData();
    formik.setFieldValue("content", data);
  };

  const onSubmit = (values) => {
    if (newToEdit) {
      console.log("Editando PATH /news/:id newToEdit.id");
      console.log("Values:", values);
    } else {
      console.log("Creando POST /news");
      console.log("Values:", values);
    }
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <FormikProvider value={formik}>
      <Form className="form-container">
        <Field
          className="input-field"
          type="text"
          name="title"
          placeholder="Titulo"
        />
        <ErrorMessage name="title" component="div" />

        {imgPreview && <img src={imgPreview} alt="preview" />}
        <input
          className="input-field"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <ErrorMessage name="image" component="div" />

        <CKEditor
          name="content"
          className="input-field"
          data={initialValues.content}
          editor={ClassicEditor}
          onChange={handleEditorChange}
        />
        <ErrorMessage name="content" component="div" />

        <Field component="select" className="select-Fieldield" name="category">
          <option value="" disabled>
            Categoría
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Field>
        <ErrorMessage name="category" component="div" />

        <button className="submit-btn" type="submit">
          Guardar
        </button>
      </Form>
    </FormikProvider>
  );
};

export default NewsForm;
