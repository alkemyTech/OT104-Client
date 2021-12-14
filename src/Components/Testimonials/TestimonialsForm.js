import React, { useState } from "react";
import * as yup from "yup";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Spinner } from "react-bootstrap";
import "../FormStyles.css";
import {
  updateTestimonial,
  createTestimonial,
} from "../../Services/testimonialServices";

const TestimonialForm = ({ testimonial = null }) => {
  const [submitting, setSubmitting] = useState(false);
  const [ckEditorError, setCkEditorError] = useState(false);
  const [message, setMessage] = useState("");
  const isEditing = !!testimonial;

  const initialValues = {
    name: testimonial?.name || "",
    description: testimonial?.description || "",
    image: testimonial?.image || "",
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(4, "Name must be at least 4 characters long.")
      .required("Please, write a title."),
    description: yup.string().required("Please, write a description."),
    image: yup
      .string()
      .matches(/\.(jpg|png)$/, "We only support .png or .jpg format files.")
      .required("Please, add an image."),
  });

  return (
    <div>
      <h3 className='text p-5'>Submit a new testimonial</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values) => {
          setSubmitting(true);
          if (isEditing) {
            const res = await updateTestimonial(testimonial.id, values);
            console.log(res);
            setSubmitting(false);
          } else {
            const res = await createTestimonial(values);
            console.log(res);
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <div className='form-container'>
            <Form>
              <Field
                className={`form-control mb-4 shadow-none ${
                  touched.name && errors.name && `is-invalid`
                }`}
                type='text'
                name='name'
                placeholder='Testimonial title'
              />
              {touched && errors.name && (
                <p className='text-danger'>{errors.name}</p>
              )}
              <CKEditor
                name='description'
                data={values.description}
                editor={ClassicEditor}
                onChange={(_, editor) =>
                  setFieldValue("description", editor.getData())
                }
                onBlur={(_, editor) =>
                  editor.getData() === ""
                    ? setCkEditorError(true)
                    : setCkEditorError(false)
                }
              />
              {ckEditorError && (
                <p className='text-danger mb-3 mt-3'>
                  Please, write a description.
                </p>
              )}
              <Field
                className={`form-control mb-4 mt-4 shadow-none ${
                  errors.image && `is-invalid`
                }`}
                type='file'
                name='image'
              />
              {touched.image && errors.image && (
                <p className='text-danger'>{errors.image}</p>
              )}
              <button className='submit-btn d-inline-block' type='submit'>
                Submit
              </button>
              {message && <div className='text-danger p-3'>{message}</div>}
              {submitting && (
                <div className='d-block mt-3'>
                  <Spinner animation='grow' />
                </div>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default TestimonialForm;
