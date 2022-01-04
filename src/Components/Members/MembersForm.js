import React, { useState } from "react";
import "../FormStyles.css";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form as FormBootstrap } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import membersService from "../../Services/membersService";
import Title from "../Title/Title";

const MembersForm = ({ member = null }) => {
  const [ckEditorError, setCkEditorError] = useState(false);
  const [message, setMessage] = useState("");
  const isEditing = !!member;
  const [imageString, setImageString] = useState("");
  const [imageUrl, setImageUrl] = useState(() => member?.image || "");

  const initialValues = {
    name: member?.name || "",
    image: member?.image || "",
    description: member?.description || "",
    facebook: member?.facebook || "",
    instagram: member?.instagram || "",
    linkedin: member?.linkedin || "",
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(4, "El nombre debe tener al menos 4 caracteres de largo.")
      .required("Por favor, ingrese un nombre."),
    image: yup
      .string()
      .matches(/\.(jpg|png)$/, "Solamente se aceptan imágenes con formato .jpg o .png.")
      .required("Por favor, ingrese una imagen."),
    description: yup.string().required("Por favor, ingrese una descripción."),
    facebook: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Por favor, ingrese un sitio web válido."
      )
      .required("Por favor, ingrese una página de Facebook."),
    instagram: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Por favor, ingrese un sitio web válido."
      )
      .required("Por favor, ingrese un perfil de Instagram."),
    linkedin: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Por favor, ingrese un sitio web válido."
      )
      .required("Por favor, ingrese un perfil de LinkedIn."),
  });

  return (
    <>
      <Title>Registro de Nuevo Miembro</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values) => {
          let { image, ...userData } = values;
          userData = {
            ...userData,
            image: imageString,
          };
          if (isEditing) {
            try {
              await membersService.edit(member.id, userData);
              setMessage("Miembro editado correctamente");
              setTimeout(() => {
                setMessage("");
              }, 4000);
            } catch (error) {
              setMessage("Ha habido un error.");
              setTimeout(() => {
                setMessage("");
              }, 4000);
            }
          } else {
            try {
              let res = await membersService.create(userData);
              if (res.data.success) {
                setMessage("Miembro creado correctamente");
                setTimeout(() => {
                  setMessage("");
                }, 4000);
              } else {
                throw new error();
              }
            } catch (error) {
              setMessage("Ha habido un error.");
              setTimeout(() => {
                setMessage("");
              }, 4000);
            }
          }
        }}
      >
        {({ values, setFieldValue, touched, errors, handleChange }) => (
          <div>
            <Form className="form-container bg-light p-3 my-4 border" style={{maxWidth: "30rem"}}>
              <FormBootstrap.Group className="d-flex flex-column mb-3">
              <Field
                className={`form-control shadow-none ${
                  touched.name && errors.name && `is-invalid`
                }`}
                type="text"
                name="name"
                placeholder="Nombre"
              />
              {touched.name && errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
              </FormBootstrap.Group>
              <FormBootstrap.Group className="d-flex flex-column mb-3">
                <Field
                  className={`form-control shadow-none ${
                    touched.image && errors.image && `is-invalid`
                  }`}
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    handleChange(e);
                    touched.image = true;
                    const file = e.target.files[0];
                    if (file) {
                      setImageUrl(URL.createObjectURL(file));
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImageString(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {touched.image && errors.image && (
                  <div className="invalid-feedback">{errors.image}</div>
                )}
                {imageUrl && !errors.image ? (
                  <img
                    src={imageUrl}
                    alt="member-image"
                    className="rounded-fluid"
                  />
                ) : null}
              </FormBootstrap.Group>
              <FormBootstrap.Group className="d-flex flex-column mb-3">
              <CKEditor
                className="input-field"
                name="description"
                data={values.description}
                editor={ClassicEditor}
                onChange={(_, editor) =>
                  setFieldValue("description", editor.getData())
                }
                onBlur={(_, editor) =>
                  editor.getData() === ""
                    ? setCkEditorError(true)
                    : setCkEditorError(false)
                }
              />

              {ckEditorError && (
                <div className="text-danger" style={{fontSize: "0.875em"}}>
                  Por favor, escriba una descripción.
                </div>
              )}
              </FormBootstrap.Group>
              <FormBootstrap.Group className="d-flex flex-column mb-3">
                <Field
                  className={`form-control shadow-none ${
                    touched.facebook && errors.facebook && `is-invalid`
                  }`}
                  type="text"
                  name="facebook"
                  placeholder="Perfil de Facebook"
                />
                {touched.facebook && errors.facebook && (
                  <div className="invalid-feedback">{errors.facebook}</div>
                )}
              </FormBootstrap.Group>
              <FormBootstrap.Group className="d-flex flex-column mb-3">
              <Field
                className={`form-control shadow-none ${
                  touched.instagram && errors.instagram && `is-invalid`
                }`}
                type="text"
                name="instagram"
                placeholder="Perfil de Instagram"
              />
              {touched.instagram && errors.instagram && (
                <div className="invalid-feedback">{errors.instagram}</div>
              )}
              </FormBootstrap.Group>
              <FormBootstrap.Group className="d-flex flex-column mb-3">
              <Field
                className={`form-control shadow-none ${
                  touched.linkedin && errors.linkedin && `is-invalid`
                }`}
                type="text"
                name="linkedin"
                placeholder="Perfil de LinkedIn"
              />
              {touched.linkedin && errors.linkedin && (
                <div className="invalid-feedback">{errors.linkedin}</div>
              )}
              </FormBootstrap.Group>
              <button className="submit-btn" type="submit">
                Enviar
              </button>
              {message && (
                <div className="text-danger text-center">{message}</div>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default MembersForm;
