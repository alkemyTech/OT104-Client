import React, { useEffect, useState } from "react";
import * as Formik from "formik";
import * as Yup from "yup";
import {
  Form,
  Button,
  Image,
  Container,
  Row,
  ButtonGroup,
  ToggleButton,
  Stack,
} from "react-bootstrap";

import userService from "../../Services/userService";
import UseGeoLocation from "./useGeoLocation";
import axios from "axios";
import SearchAddress from "./SearchAddress";
import {
  alertServiceError,
  alertServiceInfoTimer,
} from "../Alert/AlertService";
import { useParams } from "react-router-dom";
import Title from "../Title/Title";
import Spinner from "../Spinner/Spinner";

const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
const ROLES = {
  admin: 1,
  user: 2,
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(4, "El nombre debe contener al menos 4 caracteres.")
    .required("El nombre es obligatorio."),
  email: Yup.string().email("Email inválido").required("Obligatorio"),
  role_id: Yup.number()
    .oneOf(
      [ROLES.admin, ROLES.user],
      "Opciones válidas: administrador, usuario."
    )
    .required("Obligatorio"),
  profile_image: Yup.mixed().test((value, { createError }) => {
    if (!value) {
      return createError({
        path: "profile_image",
        message: "La imagen es obligatoria.",
      });
    }
    if (typeof value === "string") {
      return true;
    }
    if (value.type) {
      if (!SUPPORTED_FORMATS.includes(value.type)) {
        return createError({
          path: "profile_image",
          message: `Los formatos validos son ${SUPPORTED_FORMATS}`,
        });
      }
    }
    return true;
  }),
  password: Yup.string()
    .min(8, "La contraseña debe contener al menos 8 caracteres.")
    .required("Obligatorio"),
  address: Yup.string().nullable(),
});

const InputFile = ({ name, setValue, initialValue, ...props }) => {
  const [img, setImg] = useState(initialValue);

  const handleFile = (event) => {
    setValue(name, event.currentTarget.files[0]);
    if (event.currentTarget.files[0]) {
      setImg(URL.createObjectURL(event.currentTarget.files[0]));
    } else {
      URL.revokeObjectURL(img);
      setImg(null);
    }
  };

  useEffect(() => {
    if (initialValue) {
      setImg(initialValue);
    }
  }, [initialValue]);

  return (
    <Stack gap={3}>
      {img && <Image src={img} alt="" fluid />}
      <Form.Control
        {...props}
        name={name}
        id={name}
        type="file"
        accept=".jpg, .png"
        onChange={handleFile}
      />
    </Stack>
  );
};

const UserForm = () => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [addressState, setAddressState] = useState("");
  const [geoOption, setGeoOption] = useState(false);
  const location = UseGeoLocation();
  const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [coordinates, setCoordinates] = useState({
    lat: location.coordinates?.lat,
    lng: location.coordinates?.lng,
  });
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    role_id: "",
    profile_image: null,
    password: "",
    address: "",
  });

  const getAdress = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coordinates.lat},${location.coordinates.lng}&key=${api_key}`
      );
      setAddressState(response.data.results[0].formatted_address);
    } catch (error) {
      alertServiceError(
        "Error al cargar el mapa",
        "Por favor ingrese su domicilio o habilite la localizacion"
      );
    }
  };

  const getUserByParams = async (id) => {
    try {
      setLoading(true);
      let {
        data: { data: user },
      } = await userService.getById(id);
      let dataUser = {
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        profile_image: user.profile_image,
        password: user.password,
        address: user.address,
      };
      setInitialValues(dataUser);
      setLoading(false);
    } catch (err) {
      alertServiceError(
        "Error",
        "Ocurrio un error al intentar encontrar el usuario"
      );
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (values) => {
    setLoading(true);
    let formToSend = {};
    let { profile_image, ...rest } = values;

    if (typeof profile_image === "object") {
      profile_image = await toBase64(profile_image);
      formToSend = {
        profile_image,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        ...rest,
      };
    } else {
      formToSend = {
        ...rest,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      };
    }
    if (isEditing) {
      try {
        await userService.update(id, formToSend);
        setLoading(false);
        alertServiceInfoTimer(
          "center",
          "success",
          "Usuario actualizado correctamente."
        );
      } catch (err) {
        setLoading(false);
        alertServiceError("Error", "No se pudo aditar el usuario.");
      }
    } else {
      try {
        await userService.create(formToSend);
        setLoading(false);
        alertServiceInfoTimer(
          "center",
          "success",
          "Usuario creado correctamente."
        );
      } catch (err) {
        setLoading(false);
        alertServiceError("Error", "No se pudo crear el usuario.");
      }
    }
  };

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      getUserByParams(id);
    } else {
      setLoading(false);
    }
    getAdress();
  }, [id]);

  return (
    <Stack>
      <Title>{isEditing ? "Editar usuario" : "Crear usuario"}</Title>
      <div style={{ maxWidth: "30rem" }} className="card bg-light my-4 mx-auto">
        {loading ? (
          <Spinner />
        ) : (
          <Formik.Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({
              dirty,
              isValid,
              touched,
              errors,
              isSubmitting,
              setFieldTouched,
              setFieldValue,
            }) => (
              <Formik.Form as={Form} className="p-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="name"> Nombre</Form.Label>
                  <Formik.Field
                    as={Form.Control}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre"
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
                  <Form.Label htmlFor="email"> Correo electrónico </Form.Label>
                  <Formik.Field
                    as={Form.Control}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo electrónico"
                    isInvalid={errors.email && touched.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password"> Contraseña </Form.Label>
                  <Formik.Field
                    as={Form.Control}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
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
                <ButtonGroup className="mb-3">
                  <ToggleButton
                    id="toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={geoOption}
                    value="1"
                    onChange={(e) => setGeoOption(e.currentTarget.checked)}
                  >
                    Usar Ubicación Actual
                  </ToggleButton>
                </ButtonGroup>
                <Form.Group className="mb-3">
                  {location.loaded && geoOption ? (
                    <>
                      <Form.Label htmlFor="address">
                        Confirmar Ubicación Actual
                      </Form.Label>
                      <Formik.Field
                        as={Form.Control}
                        type="text"
                        id="address"
                        name="address"
                        placeholder={!addressState ? "address" : addressState}
                        isInvalid={errors.address && touched.address}
                        isValid={touched.address && !errors.address}
                      />
                      {errors.address && touched.address ? (
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      ) : (
                        <Form.Text className="text-muted">
                          Debe ingresar una Ubicación valida.
                        </Form.Text>
                      )}
                      <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.coordinates.lat},${location.coordinates.lng}&zoom=14&size=400x300&sensor=false&markers=color:blue%7C${location.coordinates.lat},${location.coordinates.lng}&key=${api_key}`}
                        alt="Mapa del Ususario"
                      />
                    </>
                  ) : (
                    <SearchAddress
                      setCoordinates={setCoordinates}
                      coordinates={coordinates}
                    />
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="role_id"> Rol de usuario </Form.Label>
                  <Formik.Field
                    as={Form.Select}
                    id="role_id"
                    name="role_id"
                    isInvalid={errors.role_id && touched.role_id}
                  >
                    <option value="" disabled>
                      Rol del usuario
                    </option>
                    <option value={ROLES.admin}>Administrador</option>
                    <option value={ROLES.user}>Usuario</option>
                  </Formik.Field>
                  <Form.Control.Feedback type="invalid">
                    {errors.role_id}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="profile_image">
                    Foto de Perfil
                  </Form.Label>
                  <InputFile
                    name="profile_image"
                    onBlur={() => setFieldTouched("profile_image")}
                    setValue={setFieldValue}
                    initialValue={initialValues.profile_image}
                    isValid={touched.profile_image && !errors.profile_image}
                    isInvalid={touched.profile_image && errors.profile_image}
                    disabled={isSubmitting}
                  />
                  {errors.profile_image && touched.profile_image ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.profile_image}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Text className="text-muted">
                      Debe ingresar una Ubicación valida.
                    </Form.Text>
                  )}
                </Form.Group>
                <Button className="w-100" type="submit">
                  {isEditing ? "Actualizar" : "Crear"}
                </Button>
              </Formik.Form>
            )}
          </Formik.Formik>
        )}
      </div>
    </Stack>
  );
};

export default UserForm;
