import React, { useState } from "react";
import "../FormStyles.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ user = null }) => {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState(user?.image || "");
  const isEditing = !!user;

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    image: user?.image || "",
    password: user?.password || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "El nombre debe contener al menos 4 caracteres.")
      .required("El nombre es obligatorio."),
    email: Yup.string().email("Email inválido").required("Obligatorio"),
    role: Yup.string()
      .oneOf(["admin", "user"], "Opciones válidas: admin, user")
      .required("Obligatorio"),
    image: Yup.string()
      .matches(
        /\.(jpg|png)$/,
        "Formato de imagen inválido. Selecciona un archivo .jpg o .png"
      )
      .required("Obligatorio"),
    password: Yup.string()
      .min(8, "La contraseña debe contener al menos 8 caracteres.")
      .required("Obligatorio"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        const {image, ...userData} = values;
        const formData = new FormData();
        for (const key in userData) {
          formData.append(key, userData[key]);
        }
        formData.append("image", file);
        // TO DO: Send data to server
      },
    });

  const handleChangeImg = (event) => {
    handleChange(event);
    touched.image = true;
    const file = event.target.files[0];    
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {isEditing ? "Editar usuario" : "Crear usuario"}
      </h1>
      <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name"> Nombre </label>
          <input
            className="input-field"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Nombre"
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <label className="input-feedback">{errors.name}</label>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email"> Correo electrónico: </label>
          <input
            className="input-field"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <label className="input-feedback">{errors.email}</label>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password"> Contraseña: </label>
          <input
            className="input-field"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Contraseña"
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <label className="input-feedback">{errors.password}</label>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role"> Rol de usuario: </label>
          <select
            className="input-field"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            name="role"
          >
            <option value="" disabled>
              Rol del usuario
            </option>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
          {touched.role && errors.role && (
            <label className="input-feedback">{errors.role}</label>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image"> Foto de Perfil: </label>
          <input
            className="input-field"
            type="file"
            name="image"
            onChange={handleChangeImg}
            accept=".png, .jpeg"
            id="image"
          />
          {touched.image && errors.image && (
            <label className="input-feedback">{errors.image}</label>
          )}
        </div>

        {imageUrl && !errors.image ? (
          <img
            className="input-field"
            src={imageUrl}
            alt="foto de perfil"
          />
        ) : null}

        <button className="submit-btn" type="submit">
          {isEditing ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
