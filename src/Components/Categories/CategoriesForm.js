import React, { useState } from "react";
import "../FormStyles.css";
import { ErrorMessage, Formik } from "formik";

const CategoriesForm = () => (
  <Formik
    initialValues={{ name: "", description: "" }}
    validate={(values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.description) {
        errors.description = "Required";
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    }) => (
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Title"
        ></input>
        {errors.name && touched.name && errors.name}
        <input
          className="input-field"
          type="text"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Write some description"
        ></input>
        {errors.description && touched.description && errors.description}
        <button className="submit-btn" type="submit">
          Send
        </button>
      </form>
    )}
  </Formik>
);
export default CategoriesForm;

// const [initialValues, setInitialValues] = useState({
//     name: '',
//     description: ''
// })

// const handleChange = (e) => {
//     if(e.target.name === 'name'){
//         setInitialValues({...initialValues, name: e.target.value})
//     } if(e.target.name === 'description'){
//         setInitialValues({...initialValues, description: e.target.value})
//     }
// }

// const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(initialValues);
// }
