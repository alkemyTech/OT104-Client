import React, { useState } from "react";
import "../FormStyles.css";
import { Formik, Form, Fild, ErrorMessage, validateYupSchema } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CategoriesForm = () => {
  const URL_POST = "http://ongapi.alkemy.org/api/categories";
  const [initialValues, setInitialValues] = useState({
    name: "Edgar",
    description: "I am groot",
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setInitialValues({ ...initialValues, name: e.target.value });
    }
    if (e.target.name === "description") {
      setInitialValues({ ...initialValues, description: e.target.value });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(initialValues);
  // };

  const convertToBase64Handler = (file) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
      const base64 = btoa(reader.result);
      setInitialValues((initialValues.image = base64));
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const validateYupSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "There be at least 4 characters")
      .required("Name is required"),
    description: Yup.string()
      .min(1, "This field can't be empty.")
      .required("Description is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateYupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          let valuesJson = JSON.stringify(values);
          axios
            .post(URL_POST, values)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, handleSubmit, handleBlur, handleChange, handleReset }) => (
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            name="name"
            value={initialValues.name}
            onChange={handleChange}
            placeholder="Title"
          ></input>
          <input
            className="input-field"
            type="text"
            name="description"
            value={initialValues.description}
            onChange={handleChange}
            placeholder="Write some description"
          ></input>

          <input
            type="file"
            name="categoryImage"
            accept=".jpg,.jpeg,.png"
            onChange={(event) =>
              (values.categoryImage = convertToBase64Handler(
                event.target.files[0]
              ))
            }
          />
          <button className="submit-btn" type="submit">
            Send
          </button>
        </form>
      )}
    </Formik>
  );
};

export default CategoriesForm;
