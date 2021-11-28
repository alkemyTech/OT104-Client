import React from "react";
import { useParams } from "react-router-dom";
import "../FormStyles.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// README!!!!!
// I create a route to de categories edit page and pass the id as a parameter
// "/create-category/:categoryId"
// If I get a param id, I will get the category and set the initial values
// If I don't get a param id, I will create a new category

const CategoriesForm = () => {
  const BASE_URL = "http://ongapi.alkemy.org/api/categories";
  const { categoryId } = useParams();
  const [category, setCategory] = React.useState({});
  const [imageState, setImageState] = React.useState("");
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    description: "",
    image: "",
  });
  const convertToBase64Handler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
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

  const ConditionalForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validateYupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (category.id) {
              axios
                .put(`${BASE_URL}/${category.id}`, values)
                .then((res) => alert("Category updated successfully"))
                .catch((err) => console.log("PUT method ERROR: ", err));
            } else {
              axios
                .post(BASE_URL, values)
                .then((res) => alert("Category created successfully"))
                .catch((err) => console.log("POST method ERROR: ", err));
            }

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, errors, touched }) => (
          (values.image = imageState),
          (
            <Form className="form-container">
              <Field
                className="input-field"
                name="name"
                type="text"
                placeholder="Title"
                setFieldValue={category.name}
              />
              {errors.name && <ErrorMessage name="name" />}
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
              {errors.description &&
                touched.description &&
                errors.description && <ErrorMessage name="description" />}

              <Field
                type="file"
                name="image"
                accept=".jpg,.jpeg,.png"
                onChange={convertToBase64Handler}
              />
              {errors.image && touched.image && errors.image && (
                <ErrorMessage name="image" />
              )}

              <button className="submit-btn" type="submit">
                Send
              </button>
            </Form>
          )
        )}
      </Formik>
    );
  };

  React.useEffect(() => {
    if (categoryId) {
      axios
        .get(`${BASE_URL}/${categoryId}`)
        .then((res) => {
          let data = res.data.data;
          setInitialValues({ ...data });
          setCategory(data);
        })
        .catch((err) => {
          console.log("Error getting the category", err);
        });
    }
  }, [categoryId]);

  React.useEffect(() => {}, [initialValues]);

  return initialValues.id ? <ConditionalForm /> : <ConditionalForm />;
};

export default CategoriesForm;
