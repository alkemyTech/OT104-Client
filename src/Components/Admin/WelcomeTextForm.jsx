import React from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import axios from 'axios';
import './homeForm.css';
import * as Yup from 'yup';

const WelcomeTextForm = () => {
  const initialValues = {
    welcomeText: '',
  }
  const validationSchema = Yup.object().shape({
    welcomeText: Yup.string().min(20).required(),
  })
  const fileUpLoadHandler = async (values) => {
    console.log(values);
    axios.post("http://ongapi.alkemy.org/api/")
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
        <Form className="formContainer">
          <label>Welcome text (min 20 character) </label>  <br />
          <Field as='textarea' id="inputWelcomeText" name="welcomeText" placeholder="(ex. Welcome text..)" />
          <ErrorMessage name="welcomeText" component="span" />
          <button type='submit'>Submit</button>
        </Form>)}
    </Formik>
  )
}

export default WelcomeTextForm;
