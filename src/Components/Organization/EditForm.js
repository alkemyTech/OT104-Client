import React, { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Container, Row, Form, Button, Col, Alert, Image } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from "yup";
import axios from "axios";

const EditForm = ({ organizationInfo = null, onSubmit }) => {

  const [logoString, setLogoString] = useState("");
  const [logoUrl, setLogoUrl] = useState(()=>organizationInfo?.logo || "");
  const [ckeditorError, setCkeditorError] = useState(false);
  const [message, setMessage] = useState("");
  const isEditing = !!organizationInfo;

  const initialValues = {
    name: organizationInfo?.name || "",
    logo: organizationInfo?.logo || "",
    shortDescription: organizationInfo?.shortDescription || "",
    longDescription: organizationInfo?.longDescription || "",
    facebook_url: organizationInfo?.facebook_url || "",
    linkedin_url: organizationInfo?.linkedin_url || "",
    instagram_url: organizationInfo?.instagram_url || "",
    twitter_url: organizationInfo?.twitter_url || ""
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Requerido"),
    logo: Yup.string()
      .matches(
        /\.(jpg|png|svg)$/,
        "Tipo de archivo inválido. Debe ser .jpg, .png o .svg"
      )
      .required("Requerido"),
    shortDescription: Yup.string()
      .required("Requerido"),
    facebook_url: Yup.string()
      .required("Requerido"),
    instagram_url: Yup.string()
      .required("Requerido"),
    linkedin_url: Yup.string()
      .required("Requerido"),
    twitter_url: Yup.string()
    .required("Requerido"),
  });

  return (
    <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={ async (values) => {
            let {logo, ...userData} = values;
            userData = {
              ...userData, 
              logo: logoString
            };
            if (isEditing) {
              const res = await axios.patch(process.env.REACT_APP_URL_ORGANIZATION, userData);
              if (res.data.success) {
                setMessage("La información se actualizó correctamente")
            } else {
                setMessage("Ha habido un error actualizando la información")
            }
          } else {
            const res = await axios.post(process.env.REACT_APP_URL_ORGANIZATION, userData);
              if (res.data.success) {
                console.log(res)
                setMessage("La información fue creada correctamente")
            } else {
                setMessage("Ha habido un error creando la información")
            }
          }
        
        }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Container>
              <Row>
                <Col xs lg='5 mx-auto'>
                  <h3 className='mt-3 text-center'>Formulario de organización</h3>
                  <Form
                    className='border border-grey rounded p-4 mt-4'
                    onSubmit={handleSubmit}
                  >
                    <Form.Label htmlFor="name">Nombre</Form.Label>
                    <Form.Group className='mb-3'>
                      <Form.Control
                        type='text'
                        name='name'
                        id="name"
                        value={values.name}
                        placeholder='Enter new name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.name && !errors.name}
                        isInvalid={touched.name && errors.name}
                      />
                    </Form.Group>
                    <ErrorMessage
                      name="name"
                      component={() => <Alert variant="danger">{errors.name}</Alert>}
                    />
                    <Form.Label htmlFor="logo">Logo</Form.Label>
                    <Form.Group className='mb-3'>
                      <Form.Control
                        type='file'
                        name='logo'
                        id="logo"
                        accept='image/jpeg, image/png'
                        value={values.logo}
                        placeholder='Enter new logo'
                        onChange={(e)=> {
                          handleChange(e)
                          touched.image = true;
                          const file = e.target.files[0];
                          if (file) {
                          setLogoUrl(URL.createObjectURL(file))
                          const reader = new FileReader();
                          reader.onloadend = () => {
                          setLogoString(reader.result)
                          }
                          reader.readAsDataURL(file)
                        }}}
                        onBlur={handleBlur}
                        isValid={touched.logo && !errors.logo}
                        isInvalid={touched.logo && errors.logo}
                      />
                    </Form.Group>
                    <ErrorMessage
                      name="logo"
                      component={() => <Alert variant="danger">{errors.logo}</Alert>}
                    />
                    <Form.Group className="mb-3">
                      {logoUrl && !errors.logo ? (
                        <Image src={logoUrl} alt="logo" rounded fluid />
                      ) : null}
                    </Form.Group>
                    <Form.Label htmlFor="shortdescription">Descripción corta</Form.Label>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type='text'
                        name='shortDescription'
                        id="shortdescription"
                        value={values.shortDescription}
                        placeholder='Enter short description'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.shortDescription && !errors.shortDescription
                        }
                        isInvalid={
                          touched.shortDescription && errors.shortDescription
                        }
                      />
                      </Form.Group>
                      <ErrorMessage
                        name="shortDescription"
                        component={() => <Alert variant="danger">{errors.shortDescription}</Alert>}
                      />
                    <Form.Label className='mt-3'>Descripción larga</Form.Label>
                    <Form.Group className='mb-4'>
                    <CKEditor
                      name='longDescription'
                      editor={ClassicEditor}
                      data={values.longDescription}
                      onChange={(_, editor) => setFieldValue("description", editor.getData())}
                      onBlur={( _, editor ) => editor.getData() === "" ? setCkeditorError(true) : setCkeditorError(false)}
                    /> 
                    {ckeditorError && <p className="text-danger mb-3 mt-3">Requerido</p>}
                   </Form.Group>
                    <Form.Label htmlFor="facebook_url">Facebook</Form.Label>
                    <Form.Group className='mb-4'>
                      <Form.Control
                        type='text'
                        name='facebook_url'
                        id="facebook_url"
                        value={values.facebook_url}
                        placeholder='Enter new link'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.facebook_url && !errors.facebook_url}
                        isInvalid={touched.facebook_url && errors.facebook_url}
                      />
                    </Form.Group>
                    <ErrorMessage
                      name="facebook_url"
                      component={() => <Alert variant="danger">{errors.facebook_url}</Alert>}
                    />

                    <Form.Label htmlFor="linkedin_url">Linkedin</Form.Label>
                    <Form.Group className='mb-4'>
                      <Form.Control
                        type='text'
                        name='linkedin_url'
                        id="linkedin_url"
                        value={values.linkedin_url}
                        placeholder='Enter new link'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.linkedin_url && !errors.linkedin_url}
                        isInvalid={touched.linkedin_url && errors.linkedin_url}
                      />
                    </Form.Group>
                    <ErrorMessage
                      name="linkedin_url"
                      component={() => <Alert variant="danger">{errors.linkedin_url}</Alert>}
                    />

                    <Form.Label htmlFor="instagram_url">Instagram</Form.Label>
                    <Form.Group className='mb-4'>
                      <Form.Control
                        type='text'
                        name='instagram_url'
                        id="instagram_url"
                        value={values.instagram_url}
                        placeholder='Enter new link'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.instagram_url && !errors.instagram_url}
                        isInvalid={
                          touched.instagram_url && errors.instagram_url
                        }
                      />
                    </Form.Group>
                    <ErrorMessage
                      name="instagram_url"
                      component={() => <Alert variant="danger">{errors.instagram_url}</Alert>}
                    />

                    <Form.Label htmlFor="twitter_url">Twitter</Form.Label>
                    <Form.Group className='mb-4'>
                      <Form.Control
                        type='text'
                        name='twitter_url'
                        id="twitter_url"
                        value={values.twitter_url}
                        placeholder='Enter new link'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.twitter_url && !errors.twitter_url}
                        isInvalid={touched.twitter_url && errors.twitter_url}
                      />
                    </Form.Group>
                    <ErrorMessage
                      name="twitter_url"
                      component={() => <Alert variant="danger">{errors.twitter_url}</Alert>}
                    />

                    <Button className='submit-btn' role="button" type='submit'>
                      Enviar
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Row>{message && <Alert variant="info">{message}</Alert>}</Row>
            </Container>
          )}
        </Formik>
    </>
  );
};

export default EditForm;
