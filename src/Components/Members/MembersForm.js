import React, { useState } from 'react';
import '../FormStyles.css';
import * as yup from "yup";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const MembersForm = ({member = null}) => {
  
  const [ckEditorError, setCkEditorError] = useState(false);
    const [message, setMessage] = useState("");
    const isEditing = !!member;

    const initialValues = {
    name: member?.name || "",
    image: member?.image || "",
    description: member?.description || "",
    facebook: member?.facebook || "",
    instagram: member?.instagram || "",
    linkedin: member?.linkedin || ""
  };

  const schema = yup.object().shape({
      name: yup.string().min(4, "Name must be at least 4 characters long.").required("You have to provide a name."),
      image: yup.string()
      .matches(
        /\.(jpg|png)$/,
        "We only support .png or .jpg format files."
      )
      .required("You have to provide an image."),
      description: yup.string().required("You have to provide a description."),
      facebook: yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Please, provide a valid website.'
        )
        .required('Please, provide a website for your social media.'),
      instagram: yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Please, provide a valid website.'
        )
        .required('Please, provide a website for your social media.'),
      linkedin: yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Please, provide a valid website.'
        )
        .required('Please, provide a website for your social media.')
    });

    return (
        <Formik
        initialValues= {initialValues}
        validationSchema = {schema}
        onSubmit={async (values)=> {
            console.log(values);
            if (isEditing) {
            try {
                await axios.patch(`http://ongapi.alkemy.org/api/members/${member.id}`, values)
                setMessage("Miembro editado correctamente");
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
                await axios.post(`http://ongapi.alkemy.org/api/members`, values)
                .then((response)=>{
                console.log(response);
                setMessage("Miembro creado correctamente");
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
            placeholder="Member name"/>
            <ErrorMessage name="name" />
            <Field 
            className="input-field" 
            type="file" 
            name="image" 
            placeholder="Member image"/>
           <ErrorMessage name="image" />
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
            type="text" 
            name="facebook" 
            placeholder="Facebook profile"/>
            <ErrorMessage name="facebook" />
            <Field 
            className="input-field" 
            type="text" 
            name="instagram" 
            placeholder="Instagram profile"/>
            <ErrorMessage name="instagram" />
            <Field 
            className="input-field" 
            type="text" 
            name="linkedin" 
            placeholder="Linkedin profile"/>
            <ErrorMessage name="linkedin" />
            <button className="submit-btn" type="submit">Send</button>
            {message && <div>{message}</div>}
        </Form>
           </div>
        )}
        </Formik>
    );
}
 
export default MembersForm;