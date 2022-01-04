import React, { useState, useRef, useEffect } from "react";
import "../FormStyles.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormikProvider, Form, ErrorMessage, useFormik } from "formik";
import * as activitiesService from "../../Services/activitiesService" ;
import Spinner from "../Spinner/Spinner";
import { alertServiceError } from "../Alert/AlertService";
import {
  Form as FormBootstrap,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Alert,
  Container,
} from "react-bootstrap";

const ActivitiesForm = ({
  match, 
  test=false, 
  mockSubmit, 
  mockCreateActivity,
  mockUpdateActivity,
  mockGetActivity
}) => {
  const [ loaded, setLoaded ] = useState(false);
  const activityId = match.params === undefined ? undefined : match.params.id;
  const [ isCreate, setIsCreate ] = useState(activityId === undefined ? true : false);

  const createActivity = test===true && mockCreateActivity!==undefined ? mockCreateActivity : activitiesService.createActivity;
  const updateActivity = test===true && mockUpdateActivity!==undefined ? mockUpdateActivity : activitiesService.updateActivity;
  const getActivity = test===true && mockGetActivity!==undefined? mockGetActivity : activitiesService.getActivity;

  const fileInput = useRef();
  const descriptionInput = useRef();
  const initialValues = {
        name: "",
        image: "",
        description: "",
  }

  const handleErrors = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Por favor, ingrese un nombre.";
    }
    if (!values.image) {
      errors.image = "Por favor, ingrese una imagen.";
    }
    if (!values.description) {
      errors.description = "Por favor, ingrese una descripción.";
    }
    return errors;
  };

  function handleFileChange(e) {
    e.preventDefault();
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        formik.setFieldValue("image", reader.result, true);
        formik.validateField("image");
      };
      reader.onerror = (error) => {
        fileInput.current.value = "";
        formik.setFieldValue("image", "", true);
        formik.validateField("image");
        alert("No se pudo cargar el archivo de imagen. Error:" + error + ".");
      };
    } else {
      formik.setFieldValue("image", "", true);
      formik.validateField("image");
    }
  }

  function handleDescriptionChange(_, editor) {
    const data = editor.getData();
    formik.setFieldValue("description", data);
  }

  const handleSubmit = async (values, { resetForm }) => {
    const now = new Date();
    let fetchBody = {
      name: values.name,
      slug: isCreate ? null : values.slug,
      image: values.image,
      description: values.description,
      created_at: isCreate ? now.toISOString() : values.created_at,
      updated_at: now.toISOString(),
      id: isCreate ? 0 : values.id,
      user_id: isCreate ? 0 : values.user_id,
      category_id: isCreate ? 0 : values.category_id,
      deleted_at: isCreate ? null : values.deleted_at,
    };
    if (isCreate) {
      const response = await createActivity(fetchBody);
      if(response.data.success===true){
        alertServiceError("Actividad creada", "Actividad creada satisfactoriamente.")
      }else{
        alertServiceError("Actividad no creada", "No se pudo crear la actividad. Hubo un error.")
      }
    } else {
      const response = await updateActivity(values.id, fetchBody);
      if(response.data.success===true){
        alertServiceError("Actividad modificada", "Actividad modificada satisfactoriamente.")
      }else{
        alertServiceError("Actividad no modificada", "No se pudo modificar la actividad. Hubo un error.")
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: test===true ? mockSubmit : handleSubmit,
    validate: handleErrors,
  });

  useEffect(() => {
    async function getCurrentActivity(){
      if(activityId!==undefined){
        const activityData = await getActivity(parseInt(activityId))
        if(activityData!==undefined){ 
          await formik.setValues(activityData.data.data)
        }else{
          setIsCreate(true);
        }
      }
      setLoaded(true)
    }
    getCurrentActivity();
  },[])

  return (
    <Container style={{ maxWidth: "30rem" }} className="card bg-light my-4">
      <h2 className="text-center p-3">Crear actividades</h2>
      <FormikProvider value={formik}>
        <Form data-testid="form" className="p-3" encType="multipart/form-data">
          <FormGroup className="d-flex flex-column mb-3">
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <FormControl
              as={FormBootstrap.Control}
              id="name"
              name="name"
              data-testid="name"
              type={"text"}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <FormBootstrap.Control.Feedback type="invalid">
              {formik.errors.name}
            </FormBootstrap.Control.Feedback>
          </FormGroup>

          <FormGroup className="d-flex flex-column mb-3">
            <FormLabel htmlFor="image">Imagen</FormLabel>
            <FormControl
              id="image"
              type="file"
              name="image"
              data-testid="image"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
              ref={fileInput}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.image && formik.errors.image}
            />
            <FormBootstrap.Control.Feedback type="invalid">
              {formik.errors.image}
            </FormBootstrap.Control.Feedback>
          </FormGroup>
          <FormGroup className="d-flex flex-column mb-3">
            <FormLabel htmlFor="description">Descripción</FormLabel>
           {/*  <FormControl
              as={CKEditor}
              id="description"
              name="description"
              editor={ClassicEditor}
              data={formik.values.description}
              ref={descriptionInput}
              onChange={handleDescriptionChange}
            /> */}
            <ErrorMessage
              name="description"
              component="div"
              className="text-danger mt-1"
              style={{ fontSize: ".9rem" }}
            />
          </FormGroup>
          <Button type="submit" className="w-100">
            Enviar
          </Button>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default ActivitiesForm;
