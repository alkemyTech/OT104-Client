import React, { useState } from 'react';
import '../FormStyles.css';
import * as yup from "yup";
import { Formik, Form, Field } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';
import membersService from '../../Services/membersService';

const MembersForm = ({member = {
  id: 331,
  name: "Juan Juarez",
  image: "",
  description: "Soy Juan Juarez.",
  facebook: "https://www.facebook.com.ar/juanjuarez",
  instagram: "https://www.instagram.com.ar/juanjuarez", 
  linkedin: "https://www.linkedin.com.ar/juanjuarez"
}}) => {
  
  const [ckEditorError, setCkEditorError] = useState(false);
  const [message, setMessage] = useState("");
  const isEditing = !!member;
  const [imageString, setImageString] = useState("");
  const [imageUrl, setImageUrl] = useState(()=>member?.image || "");

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
            let {image, ...userData} = values;
            userData = {
              ...userData, 
              image: imageString
            };
            if (isEditing) {
              try {
                  const response = await membersService.edit(member.id, userData);
                  console.log(response);
                  setMessage("Miembro editado correctamente");
                  setTimeout(()=>{
                    setMessage("")
                  }, 4000)
              } catch (error) {
                  console.log(error)
                  setMessage("Ha habido un error.");
                  setTimeout(()=>{
                    setMessage("")
                  }, 4000)
              }
            }else{
              try {
                  await membersService.create(userData);
                  setMessage("Miembro creado correctamente");
                  setTimeout(()=>{
                  setMessage("")
                  }, 4000)
              } catch (error) {
                  setMessage("Ha habido un error.");
                  setTimeout(()=>{
                  setMessage("")
                  }, 4000)
              }
            }
         }}
        >
        {({values, setFieldValue, touched, errors, handleChange}) => (
        <div>
          <h3 className="p-4 text-center">Member registration</h3>
          <Form className="form-container">
              <Field 
              className={`form-control mb-4 shadow-none ${touched.name && errors.name && `is-invalid`}`}
              type="text" 
              name="name" 
              placeholder="Name"/>
              {touched.name && errors.name && <p className="text-danger">{errors.name}</p>}
              <Field 
                className={`form-control mb-4 shadow-none ${touched.image && errors.image && `is-invalid`}`}
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={(e)=> {
                  handleChange(e)
                  touched.image = true;
                  const file = e.target.files[0];
                  if (file) {
                  setImageUrl(URL.createObjectURL(file))
                  const reader = new FileReader();
                  reader.onloadend = () => {
                  setImageString(reader.result)
                  }
                  reader.readAsDataURL(file)
                }}}
                />
                {touched.image && errors.image && <p className="text-danger">{errors.image}</p>}
                {(imageUrl && !errors.image) ? 
                <img src={imageUrl} alt="member-image" className="rounded-fluid"/>
                : null}
              <CKEditor
                className="input-field"
                name="description"
                data={values.description}
                editor={ClassicEditor}
                onChange={(_, editor) => setFieldValue("description", editor.getData())}
                  onBlur={( _, editor ) => editor.getData() === "" ? setCkEditorError(true) : setCkEditorError(false)}
              /> 
                  {ckEditorError && <p className="text-danger mb-3 mt-3">Please, write a description.</p>}
              <Field 
             className={`form-control mb-4 shadow-none ${touched.facebook && errors.facebook && `is-invalid`}`}
             type="text" 
             name="facebook" 
              placeholder="Facebook profile"/>
                  {touched.facebook && errors.facebook && <p className="text-danger">{errors.facebook}</p>}
            <Field 
               className={`form-control mb-4 shadow-none ${touched.instagram && errors.instagram && `is-invalid`}`} 
               type="text" 
               name="instagram" 
               placeholder="Instagram profile"/>
                    {touched.instagram && errors.instagram && <p className="text-danger">{errors.instagram}</p>}
               <Field 
               className={`form-control mb-4 shadow-none ${touched.linkedin && errors.linedin && `is-invalid`}`}
               type="text" 
               name="linkedin" 
               placeholder="Linkedin profile"/>
                  {touched.linkedin && errors.linkedin && <p className="text-danger">{errors.linkedin}</p>}
               <button className="submit-btn" type="submit">Send</button>
                {message && <div className="text-danger text-center">{message}</div>}
            </Form>
        </div>
        )}
        </Formik>
    );
}
 
export default MembersForm;
