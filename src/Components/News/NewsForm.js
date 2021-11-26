import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ErrorMessage, Form, Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../../Components/FormStyles.css";

const NewsForm = ({ newToEdit = false }) => {
  const history = useHistory();
  const [imgPreview, setImgPreview] = useState("");
  const [imageState, setImageState] = useState("");
  const [categories, setCategories] = useState([]);
  const initialValues = {
    name: newToEdit.name || "",
    image: newToEdit.image || "",
    content: newToEdit.content || "",
    category: newToEdit.category || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "El título debe tener al menos 4 caracteres")
      .required("El titulo es requerido"),
    image: Yup.string().required("La imagen es requerida"),
    content: Yup.string().required("El contenido es requerido"),
    category: Yup.string().required("La categoria es requerida"),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://ongapi.alkemy.org/api/categories");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.log(error);
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
  }, [imageState]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const onSubmit = async (values) => {
    let isError = false;

    const newsSubmission = axios.create({
      baseURL: "http://ongapi.alkemy.org/api/",
    });

    if (newToEdit) {
      //if we are editing a news
      const { image, ...rest } = values;
      let edited = rest;
      if (values.image.slice(0, 4) === "data") edited = values;
      try {
        await newsSubmission.put(`news/${newToEdit.id}`, edited);
      } catch (error) {
        isError = error;
        console.log(error);
      }
    } else {
      //if we are creating a new news
      try {
        await newsSubmission.post("news", values);
      } catch (error) {
        isError = error;
        console.log(error);
      }
    }

    if (!isError) {
      alert("News guardada con éxito");
      history.go(0);
    } else {
      alert("Error al guardar la news: " + isError.toString());
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <FormikProvider value={formik}>
      <Form className="form-container">
        <label htmlFor="name">Título</label>
        <Field
          className="input-field"
          type="text"
          name="name"
          placeholder="Titulo"
        />
        <ErrorMessage name="name" component="div" className="input-feedback" />

        <label htmlFor="image">Imagen</label>
        {imgPreview && <img src={imgPreview} alt="preview" />}
        <input
          className="input-field"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <ErrorMessage name="image" component="div" className="input-feedback" />

        <label htmlFor="content">Contenido</label>
        <CKEditor
          name="content"
          className="input-field"
          data={initialValues.content}
          editor={ClassicEditor}
          onChange={handleEditorChange}
        />
        <ErrorMessage
          name="content"
          component="div"
          className="input-feedback"
        />

        <label htmlFor="category">Categoría</label>
        <Field component="select" className="select-Fieldield" name="category">
          <option value="" disabled>
            Seleccionar
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="category"
          component="div"
          className="input-feedback"
        />

        <button
          className="submit-btn"
          type="submit"
          disabled={formik.isSubmitting && true}
        >
          {formik.isSubmitting ? "Enviando" : "Enviar"}
        </button>
      </Form>
    </FormikProvider>
  );
};

export default NewsForm;
