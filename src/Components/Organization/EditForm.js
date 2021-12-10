import React, { useState } from 'react';
import { Formik } from 'formik';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateForm } from './CreateForm';

const EditForm = ({ organizationInfo }) => {
  const [name, setName] = useState(organizationInfo.name);
  const [logo, setLogo] = useState(organizationInfo.logo);
  const [shortDescription, setShortDescription] = useState(
    organizationInfo.shortDescription
  );
  const [longDescription, setLongDescription] = useState(
    organizationInfo.longDescription
  );
  const [facebook, setFacebook] = useState(organizationInfo.facebook_url);
  const [linkedin, setLinkedin] = useState(organizationInfo.linkedin_url);
  const [instagram, setInstagram] = useState(organizationInfo.instagram_url);
  const [twitter, setTwitter] = useState(organizationInfo.twitter_url);
  const [ckeditorError, setCkeditorError] = useState(false);

  return (
    <>
      {name !== undefined ? (
        <Formik
          initialValues={{
            name: '',
            logo: '',
            shortDescription: '',
            longDescription: '',
            facebook_url: '',
            linkedin_url: '',
            instagram_url: '',
            twitter_url: '',
          }}
          validate={(values) => {
            let errors = {};

            //Validacion name
            if (!values.name) {
              errors.name = 'Please instert name';
            }

            //Validacion logo
            if (!values.logo.includes('.jpg') | values.logo.includes('.png')) {
              errors.logo = 'Only .jpg and .png extensions are allowed';
            }

            //Validacion short description
            if (!values.shortDescription) {
              errors.shortDescription = 'Please instert short description';
            }

            //Validacion long description
            if (!values.longDescription) {
              errors.longDescription = 'Please instert long description';
            }

            //Validacion facebook_url
            if (!values.facebook_url) {
              errors.facebook_url = 'Please instert Facebook url';
            }

            //Validacion linkedin_url
            if (!values.linkedin_url) {
              errors.linkedin_url = 'Please instert Linkedin url';
            }

            //Validacion instagram_url
            if (!values.instagram_url) {
              errors.instagram_url = 'Please instert Instagram url';
            }

            //Validacion twitter_url
            if (!values.twitter_url) {
              errors.twitter_url = 'Please instert Twitter url';
            }
            return errors;
          }}
          onSubmit={(values) => {
            let newInfo = {
              name: values.name,
              logo: values.logo,
              shortDescription: values.shortDescription,
              longDescription: values.longDescription,
              facebook_url: values.facebook_url,
              linkedin_url: values.linkedin_url,
              instagram_url: values.instagram_url,
              twitter_url: values.twitter_url,
            };
            // empty method for future API request
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Container>
              <Row>
                <Col xs lg='5 mx-auto'>
                  <h3 className='mt-3 text-center'>Organization Edit Form</h3>
                  <Form
                    className='border border-grey rounded p-4 mt-4'
                    onSubmit={handleSubmit}
                  >
                    <Form.Label>{name}</Form.Label>
                    <Form.Group className='mb-3'>
                      <Form.Control
                        type='text'
                        name='name'
                        value={values.name}
                        placeholder='Enter new name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        isValid={touched.name && !errors.name}
                        isInvalid={touched.name && errors.name}
                      />
                    </Form.Group>
                    {touched.name && errors.name && (
                      <div className='text-danger mb-4'>{errors.name}</div>
                    )}

                    <Form.Label>{logo}</Form.Label>
                    <Form.Group className='mb-3'>
                      <Form.Control
                        type='file'
                        name='logo'
                        accept='image/jpeg, image/png'
                        value={values.logo}
                        placeholder='Enter new logo'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        isValid={touched.logo && !errors.logo}
                        isInvalid={touched.logo && errors.logo}
                      />
                    </Form.Group>
                    {touched.logo && errors.logo && (
                      <div className='text-danger mb-4'>{errors.logo}</div>
                    )}

                    <Form.Label>{shortDescription}</Form.Label>
                    <CKEditor
                      name='shortDescription'
                      editor={ClassicEditor}
                      data={values.shortDescription}
                      onChange={(_, editor) =>
                        setFieldValue('shortDescription', editor.getData())
                      }
                      onBlur={(_, editor) => setCkeditorError(true)}
                    />
                    {ckeditorError === true ? (
                      <div className='text-danger mb-3'>
                        Please instert short description
                      </div>
                    ) : (
                      <></>
                    )}

                    <Form.Label className='mt-3'>{longDescription}</Form.Label>
                    <Form.Group className='mb-4'>
                      <Form.Control
                        type='text'
                        name='longDescription'
                        value={values.longDescription}
                        placeholder='Enter new long description'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        isValid={
                          touched.longDescription && !errors.longDescription
                        }
                        isInvalid={
                          touched.longDescription && errors.longDescription
                        }
                      />
                    </Form.Group>
                    {touched.longDescription && errors.longDescription && (
                      <div className='text-danger mb-3'>
                        {errors.longDescription}
                      </div>
                    )}

                    <Form.Label>{facebook}</Form.Label>
                    <Form.Group className='mb-4'>
                      <Form.Control
                        type='url'
                        name='facebook_url'
                        value={values.facebook_url}
                        placeholder='Enter new link'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        isValid={touched.facebook_url && !errors.facebook_url}
                        isInvalid={touched.facebook_url && errors.facebook_url}
                      />
                    </Form.Group>
                    {touched.facebook_url && errors.facebook_url && (
                      <div className='text-danger mb-3'>
                        {errors.facebook_url}
                      </div>
                    )}

                    <Form.Label>{linkedin}</Form.Label>
                    <Form.Group className='mb-4'>
                      <Form.Control
                        type='url'
                        name='linkedin_url'
                        value={values.linkedin_url}
                        placeholder='Enter new link'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        isValid={touched.linkedin_url && !errors.linkedin_url}
                        isInvalid={touched.linkedin_url && errors.linkedin_url}
                      />
                    </Form.Group>
                    {touched.linkedin_url && errors.linkedin_url && (
                      <div className='text-danger mb-3'>
                        {errors.linkedin_url}
                      </div>
                    )}

                    <Form.Label>{instagram}</Form.Label>
                    <Form.Group className='mb-4'>
                      <Form.Control
                        type='url'
                        name='instagram_url'
                        value={values.instagram_url}
                        placeholder='Enter new link'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        isValid={touched.instagram_url && !errors.instagram_url}
                        isInvalid={
                          touched.instagram_url && errors.instagram_url
                        }
                      />
                    </Form.Group>
                    {touched.instagram_url && errors.instagram_url && (
                      <div className='text-danger mb-3'>
                        {errors.instagram_url}
                      </div>
                    )}

                    <Form.Label>{twitter}</Form.Label>
                    <Form.Group className='mb-4'>
                      <Form.Control
                        type='url'
                        name='twitter_url'
                        value={values.twitter_url}
                        placeholder='Enter new link'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        isValid={touched.twitter_url && !errors.twitter_url}
                        isInvalid={touched.twitter_url && errors.twitter_url}
                      />
                    </Form.Group>
                    {touched.twitter_url && errors.twitter_url && (
                      <div className='text-danger mb-3'>
                        {errors.twitter_url}
                      </div>
                    )}

                    <Button className='submit-btn' type='submit'>
                      Register
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          )}
        </Formik>
      ) : (
        <CreateForm />
      )}
    </>
  );
};

export default EditForm;
