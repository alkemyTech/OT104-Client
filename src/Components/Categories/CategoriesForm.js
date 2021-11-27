import React from "react";
import "../FormStyles.css";
import { ErrorMessage, Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const categoriesSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Must be 15 characters or less")
    .required("This field is required!"),
  description: Yup.string()
    .min(1, "This field is required!")
    .max(140, "Must be 20 characters or less")
    .required("This field is required!"),
});

const CategoriesForm = () => (
  <Formik
    initialValues={{ name: "", description: "" }}
    validationSchema={categoriesSchema}
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

        <CKEditor
          name="description"
          editor={ClassicEditor}
          data={values.description}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            // this pass the data to the formik
            values.description = data;
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        {errors.description}
        <button className="submit-btn" type="submit">
          Send
        </button>
      </form>
    )}
  </Formik>
);
export default CategoriesForm;
