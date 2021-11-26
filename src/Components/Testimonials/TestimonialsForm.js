import React, {useState} from 'react';
import '../FormStyles.css';
import * as yup from "yup";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';


const TestimonialForm = ({ testimonial = null }) => {


    const [ckEditorError, setCkEditorError] = useState(false);
    const [message, setMessage] = useState("");
    const isEditing = !!testimonial;

     const initialValues = {
    name: testimonial?.name || "",
    description: testimonial?.description || "",
    image: testimonial?.image || ""
  };

    const schema = yup.object().shape({
      name: yup.string().min(4, "Name must be at least 4 characters long.").required("You have to provide a name."),
      description: yup.string().required("You have to provide a description."),
      image: yup.string()
      .matches(
        /\.(jpg|png)$/,
        "We only support .png or .jpg format files."
      )
      .required("You have to provide an image.")
    });

    return (
        <Formik
        initialValues= {initialValues}
        validationSchema = {schema}
        onSubmit={async (values)=> {
            console.log(values);
            if (isEditing) {
            try {
                await axios.patch(`http://ongapi.alkemy.org/api/testimonials/${testimonial.id}`, values)
                setMessage("Testimonio editado correctamente");
                setTimeout(()=>{
            setMessage("")
            }, 4000)
            } catch (error) {
                console.log(error.response.data);
                setMessage("Ha habido un error.");
                setTimeout(()=>{
                setMessage("")
                }, 4000)
            }}
            try {
                await axios.post(`http://ongapi.alkemy.org/api/testimonials`, values)
                .then((response)=>{
                console.log(response);
                setMessage("Testimonio editado correctamente");
                setTimeout(()=>{
                setMessage("")
                }, 4000)
            })
           } catch (error) {
                console.log(error.response.data);
                    setMessage("Ha habido un error.");
                setTimeout(()=>{
                setMessage("")
                }, 4000)
            }
         }}
        >
        {({values, setFieldValue}) => (
            <div>
        <Form className="form-container">
            <Field 
            className="input-field" 
            type="text" 
            name="name" 
            placeholder="Testimonial title"/>
            <ErrorMessage name="name" />
             <CKEditor
              className="input-field"
              name="description"
              data={values.description}
              editor={ClassicEditor}
              onChange={(_, editor) => setFieldValue("description", editor.getData())}
              onBlur={( _, editor ) => editor.getData() === "" ? setCkEditorError(true) : setCkEditorError(false)}
            /> 
            {ckEditorError && <p>Please, write a description.</p>}
            <Field 
            className="input-field" 
            type="file" 
            name="image" 
            placeholder="Testimonial image"/>
           <ErrorMessage name="image" />
            <button className="submit-btn" type="submit">Send</button>
            {message && <div>{message}</div>}
        </Form>
           </div>
        )}
        </Formik>
    );
}
 
export default TestimonialForm;