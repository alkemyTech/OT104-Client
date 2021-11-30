import React, { useState } from "react";
import "../FormStyles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const ProjectsForm = ({ project = null }) => {
  const [imageString, setImageString] = useState("") //imageString is the base64 string of the image
  const [imageUrl, setImageUrl] = useState(project?.image || ""); //ImageUrl is the url of the image to be displayed
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid} =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        setMessage("");
        const {...projectData} = values;
        projectData.image = imageString;
        projectData.image = "ejemplo.png"
        // INTERNAL SERVER ERROR: "Data too long for column 'image'" when sending base64 string
        if (isEditing) {
          try {
            await axios.put(`http://ongapi.alkemy.org/public/api/projects/${project.id}`, projectData);
            setMessage("Proyecto editado con éxito");
            setLoading(false);
          } catch (error) {
            console.log(error);
            setMessage("Error al editar el proyecto");
            setLoading(false);
          }
        } else {
          try{
            await axios.post(`http://ongapi.alkemy.org/public/api/projects`, projectData);
            setMessage("Proyecto creado con éxito");
            setLoading(false);
          }catch(error){
            setMessage("Error al crear el proyecto"); 
            setLoading(false);             
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
    <Container style={{maxWidth:"30rem"}}>
      <Row>
        <h1 style={{ textAlign: "center", marginTop:"1em"}}>
          {isEditing ? "Editar proyecto" : "Crear proyecto"}
        </h1>
      </Row>
      <Row>
        <Form  onSubmit={handleSubmit} className="mb-3" encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title"> Título </Form.Label>
            <Form.Control
              className="input-field"
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Título"
              onBlur={handleBlur}
              isInvalid={errors.title && touched.title}
              isValid={!errors.title && touched.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description"> Descripción </Form.Label>
            <Form.Control
              className="input-field"
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Escribe una descripción"
              onBlur={handleBlur}
              isInvalid={errors.description && touched.description}
              isValid={!errors.description && touched.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="due_date"> Fecha límite </Form.Label>
            <Form.Control
              className="input-field"
              type="date"
              name="due_date"
              value={values.due_date}
              onChange={handleChange}
              placeholder="Due date"
              isInvalid={errors.due_date && touched.due_date}
              isValid={!errors.due_date && touched.due_date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.due_date}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="image"> Imágen </Form.Label>
            <Form.Control
              className="input-field"
              type="file"
              name="image"
              onChange={handleChangeImg}
              accept=".png, .jpeg"
              isInvalid={errors.image && touched.image}
              isValid={!errors.image && touched.image}
            />
            {(errors.image && touched.image) 
              ?
                <Form.Control.Feedback type="invalid">
                  {errors.image}
                </Form.Control.Feedback>
              :
                <Form.Text className="text-muted">
                  La imagen debe ser un archivo .jpg o .png
                </Form.Text>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            {imageUrl && !errors.image 
              ? 
                <Image src={imageUrl} fluid alt="Imagen del proyecto" />
              : null
            }
          </Form.Group>

          {
            <Button type="submit" disabled={!isValid || loading}>
              {loading 
                ?
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                :
                  isEditing ? "Actualizar" : "Crear"
              }
            </Button>
          }
        </Form>
      </Row>
      <Row>
        {message && 
          <Alert variant="info">
            {message}
          </Alert>
        }
      </Row>
    </Container>
  );
};

export default ProjectsForm;
