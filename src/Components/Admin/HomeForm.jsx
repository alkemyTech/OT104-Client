import React from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import axios from 'axios';
import './homeForm.css';
import * as Yup from 'yup';
import SlideForm from './SlideForm';
import WelcomeTextForm from './WelcomeTextForm';

const HomeForm = () => {
  return (
    <div >
      <h3 className="slideLabel">Welcome Text</h3>
      <WelcomeTextForm />
      <h3 className="slideLabel">Slide 1</h3>
      <SlideForm />
      <h3 className="slideLabel">Slide 2</h3>
      <SlideForm />
      <h3 className="slideLabel">Slide 3</h3>
      <SlideForm />
    </div>
  )
}

export default HomeForm


