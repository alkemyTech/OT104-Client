import React from 'react';
import { useParams } from 'react-router-dom';
import '../FormStyles.css';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import categoriesService from '../../Services/categoriesService';

// React Bootstrap
// import { Form } from "react-bootstrap/Button";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const CategoriesForm = ({ cateroryToEdit }) => {
  const BASE_URL = 'http://ongapi.alkemy.org/api/categories';
  const [category, setCategory] = React.useState({});
  const [imageState, setImageState] = React.useState(null);
  const [initialValues, setInitialValues] = React.useState({
    name: '',
    description: '',
    image: '',
  });

  React.useEffect(() => {
    if (cateroryToEdit) {
      setCategory(cateroryToEdit);
      setInitialValues({ ...cateroryToEdit });
    }
  }, []);

  const convertToBase64Handler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageState(reader.result);
    };
  };

  const validateYupSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'There be at least 4 characters')
      .required('Name is required'),
    description: Yup.string()
      .min(1, "This field can't be empty.")
      .required('Description is required'),
  });

  const ConditionalForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validateYupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (category.id) {
            await categoriesService.update(category.id, values);
          } else {
            await categoriesService.create(values);
          }

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          isValid,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          (values.image = imageState),
          (
            <Form noValidate onSubmit={handleSubmit} className='form-container'>
              <Form.Label>Name</Form.Label>
              <Form.Group className='mb-3'>
                <Form.Control
                  className='input-field'
                  name='name'
                  type='text'
                  placeholder='Name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setFieldValue={category.name}
                  isValid={touched.name && !errors.name}
                />

                {errors.name && <ErrorMessage name='name' />}
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <CKEditor
                  name='description'
                  editor={ClassicEditor}
                  data={values.description}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    // this pass the data to the formik
                    values.description = data;
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
                {errors.description &&
                  touched.description &&
                  errors.description && <ErrorMessage name='description' />}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  className='input-field'
                  type='file'
                  name='image'
                  accept='.jpg,.jpeg,.png'
                  onChange={convertToBase64Handler}
                />
              </Form.Group>
              {/* now is not working :( */}
              {errors.image && touched.image && errors.image && (
                <ErrorMessage name='image' />
              )}
              <Button variant='primary' type='submit'>
                Send
              </Button>
            </Form>
          )
        )}
      </Formik>
    );
  };

  return initialValues.id ? <ConditionalForm /> : <ConditionalForm />;
};

export default CategoriesForm;
