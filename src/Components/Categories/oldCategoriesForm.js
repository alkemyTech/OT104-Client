import React from "react";
import "../FormStyles.css";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const fakeCategoriy = {
  name: "category 01",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi velit deleniti molestias illum ab nemo mollitia ad, reiciendis veniam aperiam!",
  image: "https://picsum.photos/200/300",
};

const categoriesSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Too Short!")
    .max(100, "Must be 15 characters or less")
    .required("This field is required!"),
  description: Yup.string()
    .min(1, "This field is required!")
    .max(140, "Must be 20 characters or less")
    .required("This field is required!"),
  image: Yup.string().required("This field is required!"),
});

const CategoriesForm = () => {
  const [image, setImage] = React.useState(null);
  const URL_POST = "http://ongapi.alkemy.org/api/categories";
  // const URL_PUT = `http://ongapi.alkemy.org/api/categories${category_id}`;
  const convertToBase64Handler = (file) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
      const base64 = btoa(reader.result);
      setImage(base64);
      console.log(base64);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  // if user click on create category the path will be /categories/create-category
  // if user click on edit category the path will be /categories/create-category/:id

  console.log("image from state", image);
  return (
    <Formik
      initialValues={{ name: "", description: "", categoryImage: image || "" }}
      validationSchema={categoriesSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("values", values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          // console.log("values", values);
          // axios
          //   .post(URL_POST, JSON.stringify(values))
          //   .then((res) => {
          //     console.log(res);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });

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
          {/* To the future >>> this need to be stiled!!! */}
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
          {/* To the future >>> this need to be stiled!!! */}
          {errors.description && touched.description && errors.description}

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
