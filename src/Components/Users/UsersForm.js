import React, { useEffect, useState } from "react";
import "../FormStyles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import userService from "../../Services/userService";
import UseGeoLocation from "./useGeoLocation";
import axios from "axios";

const UserForm = ({ user = null }) => {
  const [imageString, setImageString] = useState(""); //imageString is the base64 string of the image
  const [imageUrl, setImageUrl] = useState(() => user?.profile_image || ""); //ImageUrl is the url of the image to be displayed
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isEditing = !!user;
  const [address, setAddress] = useState("");
  const location = UseGeoLocation();
  const api_key = "AIzaSyByrpyi221SHk-RGPPtcgtWQmlaSXytgb8";

  const getAdress = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coordinates.lat},${location.coordinates.long}&key=${api_key}`
      );
      console.log(response.data.results, "la response");
      setAddress(response.data.results[0].formatted_address);

      console.log(address, "add");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdress();
  }, [location]);
  const roles = {
    admin: 1,
    user: 2,
  };

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
      .oneOf(
        [roles.admin, roles.user],
        "Opciones válidas: administrador, usuario."
      )
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
        setLoading(true);
        setMessage("");
        let { profile_image, ...userData } = values;
        userData = { ...userData, profile_image: imageString };
        // if the response is successful will have a data property with the user data and success property with true
        //Otherwise will have a response property with a data property whit an array of errors
        if (isEditing) {
          const res = await userService.update(user.id, userData);
          setLoading(false);
          if (res.response) {
            res.response.data.errors?.email // if the error is from the email field
              ? setMessage(
                  "No se pudo editar el usuario, el email ya está registrado."
                )
              : setMessage("No se pudo editar el usuario.");
          } else if (res.data.success) {
            setMessage("Usuario actualizado correctamente.");
          } else {
            setMessage("No se pudo aditar el usuario.");
          }
        } else {
          const res = await userService.create(userData);
          setLoading(false);
          if (res.response) {
            res.response.data.errors?.email // if the error is from the email field
              ? setMessage(
                  "No se pudo crear el usuario, el email ya está registrado."
                )
              : setMessage("No se pudo crear el usuario.");
          } else if (res.data.success) {
            setMessage("Usuario creado correctamente.");
          } else {
            setMessage("No se pudo crear el usuario.");
          }
        }
      },
    });

  const handleChangeImg = (event) => {
    handleChange(event);
    touched.profile_image = true;
    const file = event.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file)); // Create a URL from the file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageString(reader.result); // Set the base64 string
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(location);
  return (
    <Container style={{ maxWidth: "30rem" }}>
      <Row>
        <h1 style={{ textAlign: "center", marginTop: "1em" }}>
          {isEditing ? "Editar usuario" : "Crear usuario"}
        </h1>
      </Row>
      <Row>
        <Form
          onSubmit={handleSubmit}
          className="mb-3"
          encType="multipart/form-data"
        >
          <Form.Group className="mb-3">
            <Form.Label> Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Nombre"
              onBlur={handleBlur}
              isInvalid={errors.name && touched.name}
              isValid={!errors.name && touched.name}
            />
            {errors.name && touched.name ? (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            ) : (
              <Form.Text className="text-muted">
                El nombre debe contener al menos 4 caracteres.
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Correo electrónico </Form.Label>
            <Form.Control
              className="input-field"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              onBlur={handleBlur}
              isInvalid={errors.email && touched.email}
              isValid={touched.email && !errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Contraseña </Form.Label>
            <Form.Control
              className="input-field"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Contraseña"
              onBlur={handleBlur}
              isInvalid={errors.password && touched.password}
              isValid={touched.password && !errors.password}
            />
            {errors.password && touched.password ? (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            ) : (
              <Form.Text className="text-muted">
                La contraseña debe contener al menos 8 caracteres.
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> GEOLOCATION </Form.Label>
            <Form.Control
              className="input-field"
              type="adress"
              name="adress"
              value={values.adress}
              onChange={handleChange}
              placeholder={!address ? "address" : address}
              onBlur={handleBlur}
              isInvalid={errors.adress && touched.adress}
              isValid={touched.adress && !errors.adress}
            />
            {errors.adress && touched.adress ? (
              <Form.Control.Feedback type="invalid">
                {errors.adress}
              </Form.Control.Feedback>
            ) : (
              <Form.Text className="text-muted">
                La direccion debe contener al menos 8 caracteres.
              </Form.Text>
            )}
            {location.loaded ? (
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.coordinates.lat},${location.coordinates.long}&zoom=14&size=400x300&sensor=false&markers=color:blue%7C${location.coordinates.lat},${location.coordinates.long}&key=${api_key}`}
                alt=""
              />
            ) : (
              "Location data not aveliable"
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="role"> Rol de usuario </Form.Label>
            <Form.Select
              className="input-field"
              value={values.role_id}
              onChange={handleChange}
              onBlur={handleBlur}
              name="role_id"
              isInvalid={errors.role_id && touched.role_id}
            >
              <option value="" disabled>
                Rol del usuario
              </option>
              <option value={roles.admin}>Administrador</option>
              <option value={roles.user}>Usuario</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.role_id}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Foto de Perfil </Form.Label>
            <Form.Control
              className="input-field"
              type="file"
              name="profile_image"
              onChange={handleChangeImg}
              accept=".png, .jpeg"
              isInvalid={errors.profile_image && touched.profile_image}
              isValid={touched.profile_image && !errors.profile_image}
            />
            {errors.profile_image && touched.profile_image ? (
              <Form.Control.Feedback type="invalid">
                {errors.profile_image}
              </Form.Control.Feedback>
            ) : (
              <Form.Text className="text-muted">
                La imagen debe ser un archivo .png o .jpg
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            {imageUrl && !errors.profile_image ? (
              <Image src={imageUrl} alt="foto de perfil" rounded fluid />
            ) : null}
          </Form.Group>
          {
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : isEditing ? (
                "Actualizar"
              ) : (
                "Crear"
              )}
            </Button>
          }
        </Form>
      </Row>
      <Row>{message && <Alert variant="info">{message}</Alert>}</Row>
    </Container>
  );
};

export default UserForm;
