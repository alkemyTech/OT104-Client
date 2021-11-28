import React, { useState } from "react";
import "../FormStyles.css";
import { Formik, Form, Fild, ErrorMessage, validateYupSchema } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CategoriesForm = () => {
  const URL_POST = "http://ongapi.alkemy.org/api/categories";
  // const [preview, setPreview] = useState(null);
  const [imageState, setImageState] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "Edgar",
    description: "I am groot",
    image: "",
  });

  const convertToBase64Handler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // setPreview(reader.result);
        let file64 = reader.result;
        console.log(typeof file64);
        setImageState(file64);
      };
    }
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
    <React.Fragment>
      {/* {preview && <img width="300" height="400" src={preview} alt="preview" />} */}
      <Formik
        initialValues={initialValues}
        validationSchema={validateYupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            axios
              .post(URL_POST, values)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, handleSubmit, handleBlur, handleChange, handleReset }) => (
          (values.image = imageState),
          (
            <form className="form-container" onSubmit={handleSubmit}>
              <input
                className="input-field"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Title"
              ></input>
              <input
                className="input-field"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Write some description"
              ></input>

              <input
                type="file"
                name="categoryImage"
                accept=".jpg,.jpeg,.png"
                onChange={convertToBase64Handler}
              />
              <button className="submit-btn" type="submit">
                Send
              </button>
            </form>
          )
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CategoriesForm;
