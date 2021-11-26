import React, { useState } from "react";
import "../FormStyles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ user = null }) => {
  const [imageString, setImageString] = useState("") //imageString is the base64 string of the image
  const [imageUrl, setImageUrl] = useState(user?.profile_image || ""); //ImageUrl is the url of the image to be displayed
  const [message, setMessage] = useState("");
  const isEditing = !!user;

  const roles = {
    admin: 1,
    user: 2,
  }

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    role_id: user?.role || "",
    profile_image: user?.profile_image || "",
    password: user?.password || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "El nombre debe contener al menos 4 caracteres.")
      .required("El nombre es obligatorio."),
    email: Yup.string().email("Email inválido").required("Obligatorio"),
    role_id: Yup.number()
      .oneOf([roles.admin,roles.user], "Opciones válidas: administrador, usuario")
      .required("Obligatorio"),
    profile_image: Yup.string()
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
        setMessage("");
        let {profile_image, ...userData} = values;
        userData = {...userData, profile_image: imageString};
        if (isEditing) {
          try {
            await axios.put(`http://ongapi.alkemy.org/api/users/${user.id}`, userData) 
            setMessage("Usuario actualizado correctamente");
          }
          catch (error) {
            console.log(error.response.data);
            error.response.data.errors?.email ? // if the error is from the email field
              setMessage("Email ya registrado") 
              : setMessage("No se pudo actualizar el usuario")
          }
        } else {
          try {
            await axios.post(`http://ongapi.alkemy.org/api/users`, userData)
            setMessage("Usuario creado correctamente");
          }
          catch (error) {
            error.response.data.errors.email 
              ? setMessage("Email ya registrado") 
              : setMessage("Error al crear el usuario");;
          }
        }
      }
    });

  const handleChangeImg = (event) => {
    handleChange(event); 
    touched.profile_image = true;
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
      {message && <p style={{textAlign:"center"}}>{message}</p>}
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
            value={values.role_id}
            onChange={handleChange}
            onBlur={handleBlur}
            name="role_id"
          >
            <option value="" disabled>
              Rol del usuario
            </option>
            <option value={roles.admin}>Administrador</option>
            <option value={roles.user}>Usuario</option>
          </select>
          {touched.role_id && errors.role_id && (
            <label className="input-feedback">{errors.role_id}</label>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="profile_image"> Foto de Perfil: </label>
          <input
            className="input-field"
            type="file"
            name="profile_image"
            onChange={handleChangeImg}
            accept=".png, .jpeg"
          />
          {touched.profile_image && errors.profile_image && (
            <label className="input-feedback">{errors.profile_image}</label>
          )}
        </div>

        {imageUrl && !errors.profile_image ? (
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
