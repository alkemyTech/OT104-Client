import React, { useState } from "react";
import "../FormStyles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ProjectsForm = ({ project = null }) => {
  const [imageString, setImageString] = useState("") //imageString is the base64 string of the image
  const [imageUrl, setImageUrl] = useState(project?.image || ""); //ImageUrl is the url of the image to be displayed
  const [message, setMessage] = useState("");
  const isEditing = !!project;

  const initialValues = {
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    due_date: project?.due_date || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Obligatorio"),
    description: Yup.string().required("Obligatorio"),
    image: Yup.string()
      .matches(
        /\.(jpg|png)$/,
        "Formato de imagen inválido. Selecciona un archivo .jpg o .png"
      )
      .required("Obligatorio"),
    due_date: Yup.date(),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        setMessage("");
        const {...projectData} = values;
        projectData.image = "image.png";
        // INTERNAL SERVER ERROR: "Data too long for column 'image'" when sending base64 string
        if (isEditing) {
          try {
            const res = await axios.put(`http://ongapi.alkemy.org/public/api/projects/${project.id}`, projectData);
            console.log(res);
            setMessage("Proyecto editado con éxito");
          } catch (error) {
            console.log(error);
            setMessage("Error al editar el proyecto");
          }
        } else {
          try{
            const res = await axios.post(`http://ongapi.alkemy.org/public/api/projects`, projectData);
            console.log(res)
            setMessage("Proyecto creado con éxito");
          }catch(error){
            console.log(error)
            setMessage("Error al crear el proyecto");              
          }
        }
      },
    });

  const handleChangeImg = (event) => {
    handleChange(event);
    touched.image = true;
    const file = event.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file)) // Create a URL from the file
      const reader = new FileReader(); 
      reader.onloadend = () => {
        setImageString(reader.result) // Set the base64 string
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {isEditing ? "Editar proyecto" : "Crear proyecto"}
      </h1>
      {message && <p style={{ textAlign:"center" }}>{message}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title"> Título </label>
          <input
            className="input-field"
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Título"
            onBlur={handleBlur}
          />
          {errors.title && touched.title && (
            <label className="input-feedback">{errors.title}</label>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description"> Descripción </label>
          <input
            className="input-field"
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Escribe una descripción"
            onBlur={handleBlur}
          />
          {errors.description && touched.description && (
            <label className="input-feedback">{errors.description}</label>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="due_date"> Fecha límite </label>
          <input
            className="input-field"
            type="date"
            name="due_date"
            value={values.due_date}
            onChange={handleChange}
            placeholder="Due date"
          />
          {errors.due_date && touched.due_date && (
            <label className="input-feedback">{errors.due_date}</label>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image"> Imágen </label>
          <input
            className="input-field"
            type="file"
            name="image"
            onChange={handleChangeImg}
            accept=".png, .jpeg"
          />
          {errors.image && touched.image && (
            <label className="input-feedback">{errors.image}</label>
          )}
        </div>

        {imageUrl && !errors.image ? (
          <img
            className="input-field"
            src={imageUrl}
            alt="imagen del proyecto"
          />
        ) : null}

        <button className="submit-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ProjectsForm;
