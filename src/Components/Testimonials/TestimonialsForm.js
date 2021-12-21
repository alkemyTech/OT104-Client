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

import { alertServiceError } from "../Alert/AlertService";

const TestimonialForm = ({ testimonial = null }) => {
  const [submitting, setSubmitting] = useState(false);
  const [ckEditorError, setCkEditorError] = useState(false);
  const [message, setMessage] = useState("");
  const [imageString, setImageString] = useState("");
  const [imageUrl, setImageUrl] = useState(() => testimonial?.image || "");
  const isEditing = !!testimonial;

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

  const initialValues = {
    name: testimonial?.name || "",
    description: testimonial?.description || "",
    image: testimonial?.image || "",
  };

  return (
    <div>
      <h3 className="text p-5 text-center">Submit a new testimonial</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values) => {
          setSubmitting(true);
          let { image, ...testimonialData } = values;
          testimonialData = {
            ...testimonialData,
            image: imageString,
          };
          if (isEditing) {
            const res = await updateTestimonial(
              testimonial.id,
              testimonialData
            );
            if (res && res.status !== 200) {
              alertServiceError("Error", "Error al actualizar el testimonio");
            }

            setSubmitting(false);
          } else {
            const res = await createTestimonial(testimonialData);
            if (res && res.status !== 200) {
              alertServiceError("Error", "Error al crear el testimonio");
            }
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, touched, errors, handleChange }) => (
          <div className="form-container">
            <Form className="form-container">
              <Field
                className={`form-control mb-4 shadow-none ${
                  touched.name && errors.name && `is-invalid`
                }`}
                type="text"
                name="name"
                placeholder="Testimonial title"
              />
              {touched && errors.name && (
                <p className="text-danger">{errors.name}</p>
              )}
              <CKEditor
                name="description"
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
                <p className="text-danger mb-3 mt-3">
                  Please, write a description.
                </p>
              )}
              <Field
                className={`form-control mb-4 mt-4 shadow-none ${
                  errors.image && `is-invalid`
                }`}
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  handleChange(e);
                  touched.image = true;
                  const file = e.target.files[0];
                  if (file) {
                    setImageUrl(URL.createObjectURL(file));
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImageString(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {touched.image && errors.image && (
                <p className="text-danger">{errors.image}</p>
              )}
              <button className="submit-btn m-auto" type="submit">
                Submit
              </button>
              {message && (
                <div className="text-danger p-3 text-center">{message}</div>
              )}
              {submitting && (
                <div className="d-block mx-auto my-3">
                  <Spinner animation="grow" />
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
