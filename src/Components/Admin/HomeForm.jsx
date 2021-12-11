import React from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import axios from 'axios';
import './homeForm.css';
import * as Yup from 'yup';
import SlideForm from './SlideForm';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormB from 'react-bootstrap/Form';



const HomeForm = ({ welcometext, name }) => {

  const initialValues = {
    name: name,
    logo: "",
    welcome_text: welcometext,
    id: null,
  }
  console.log(welcometext, initialValues.welcome_text);
  const validationSchema = Yup.object().shape({
    welcome_text: Yup.string().min(20).required(),
  })
  const fileUpLoadHandler = async (values) => {
    console.log(values);
    const res = await axios.post("http://ongapi.alkemy.org/api/organization", values)
    console.log(res);
  }
  return (

    <Container fluid>
      <Row>
        <Col lg={5} className="mx-auto">

          <Formik
            initialValues={initialValues}
            onSubmit={fileUpLoadHandler}
            validationSchema={validationSchema}
          >
            {(formProps) => (
              <Form as={FormB} className="p-3">
                <h3 className="slideLabel">Welcome Text</h3>
                <label>Welcome text (min 20 character) </label>  <br />
                <Field as={FormB.Control} id="inputWelcomeText" name="welcome_text" placeholder={initialValues.welcome_text} /> <br />
                <ErrorMessage name="welcome_text" component="span" /><br />
                <Button type='submit'>Submit Welcome Text</Button>
                <h3 className="slideLabel">Slides</h3>
                <SlideForm />
              </Form>)}
          </Formik>
        </Col>
      </Row>
    </Container>

  )
}
HomeForm.defaultProps = {
  name: "prueba",
  logo: "",
  welcometext: "hola",
  id: null,
}

export default HomeForm;
