import React from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import axios from 'axios';
import './homeForm.css';
import * as Yup from 'yup';
import FormB from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SlideForm = () => {
  const initialValues = {
    photoSlide0: '',
    photoSlide1: '',
    photoSlide2: '',
    slideText0: '',
    slideText1: '',
    slideText2: '',
  }
  const validationSchema = Yup.object().shape({
    photoSlide: Yup.string().required(),
    slideText: Yup.string().min(3).required(),
  })
  const fileUpLoadHandler = async (values) => {
    console.log(values);
    const fd = new FormData();
    fd.append('photoSlide', values.photoSlide)
    axios.post("http://ongapi.alkemy.org/api/slides/id", fd)
      .then(res => {
        console.log(res);
      });
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={fileUpLoadHandler}
      validationSchema={validationSchema}
    >
      {(formProps) => (
        <Form as={FormB}>
          <Field as={FormB.Control}
            type='file'
            name='photoSlide0'
            onChange={(event) => formProps.setFieldValue('photoSlide', event.target.files[0])}
          />
          <br />
          <label>Slide 1 text</label>
          <Field as={FormB.Control} id="slideText0" name="slideText0" placeholder="slide text..." />
          <ErrorMessage name="slideText0" component="span" />
          <Field as={FormB.Control}
            type='file'
            name='photoSlide1'
            onChange={(event) => formProps.setFieldValue('photoSlide', event.target.files[1])}
          />
          <br />
          <label>Slide 2 text</label>
          <Field as={FormB.Control} id="slideText1" name="slideText1" placeholder="slide text..." />
          <ErrorMessage name="slideText1" component="span" />
          <Field as={FormB.Control}
            type='file'
            name='photoSlide2'
            onChange={(event) => formProps.setFieldValue('photoSlide', event.target.files[2])}
          />
          <br />
          <label>Slide 3 text</label>
          <Field as={FormB.Control} id="slideText2" name="slideText2" placeholder="slide text..." />
          <ErrorMessage name="slideText2" component="span" /><br />
          <Button type='submit'>Submit Slides</Button>
        </Form>)}
    </Formik>


  )
}

export default SlideForm
