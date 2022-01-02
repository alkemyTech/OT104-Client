import React, { useState, useRef, useEffect } from "react";
import "../FormStyles.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormikProvider, Form, ErrorMessage, useFormik } from "formik";
import { FormLabel, FormControl, Button, Alert } from "react-bootstrap";
import * as activitiesService from "../../Services/activitiesService" ;
import Spinner from "../Spinner/Spinner";
import { alertServiceError } from "../Alert/AlertService";

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
      loaded ? 
      <FormikProvider value={formik}>
        <Form data-testid="form" className="form-container" encType="multipart/form-data">
          <div>
            <FormLabel>Nombre</FormLabel>
            <FormControl
              name="name"
              data-testid="name"
              type={"text"}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMessage
              name="name"
              component={() => (
                <Alert variant={"danger"}>{formik.errors.name}</Alert>
              )}
            />
          </div>
          <div>
            <FormControl
              type="file"
              name="image"
              data-testid="image"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
              ref={fileInput}
              onBlur={formik.handleBlur}
            />
            <ErrorMessage
              name="image"
              component={() => (
                <Alert variant={"danger"}>{formik.errors.image}</Alert>
              )}
            />
          </div>
          <div>
            {/* <CKEditor
              id="description"
              data-testid="description"
              editor={ClassicEditor}
              data={formik.values.description}
              ref={descriptionInput}
              onChange={handleDescriptionChange}
            /> */}
          </div>
          <Button type="submit">Enviar</Button>
        </Form>
      </FormikProvider>    
      :
      <Spinner/>
    );
};

export default ActivitiesForm;
