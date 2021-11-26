import React from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import axios from 'axios';
import './homeForm.css';
import * as Yup from 'yup';

const SlideForm = () => {
  const initialValues = {
    photoSlide: '',
    slideText: '',
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
        <Form >
          <input
            type='file'
            name='photoSlide'
            onChange={(event) => formProps.setFieldValue('photoSlide', event.target.files[0])}
          />
          <br />
          <label>Slide text</label>
          <Field id="slideText" name="slideText" placeholder="(Slide  text..)" />
          <ErrorMessage name="slideText" component="span" />
          <button type='submit'>Submit</button>
        </Form>)}
    </Formik>


  )
}

export default SlideForm
