import React, { useState } from 'react';
import '../FormStyles.css';
import { Formik } from 'formik';
import * as Yup from "yup";

// test object
const organizationInfo = {
    name: "Alkemy code camp",
    logo: "https://via.placeholder.com/150",
    shortDescription: "Una breve descripcion de la informacion",
    longDescription: "Una descripion mas larga, donde se traigan mas detalles acerca de la organizacion, sus tareas, sus objetivos y sus plazos",
    link: "https://www.instagram.com/alkemy__/",
   };


const EditForm = (/*{organizationInfo}*/) => {
    
    const [name, setName] = useState(organizationInfo.name);
    const [logo, setLogo] = useState(organizationInfo.logo);
    const [shortDescription, setShortDescription] = useState(organizationInfo.shortDescription);
    const [longDescription, setLongDescription] = useState(organizationInfo.longDescription);
    const [link, setLink] = useState(organizationInfo.link);

    return (
        <Formik
     initialValues={{ 
        name: "",
        logo: "",
        shortDescription: "",
        longDescription: "",
        link: "",
      }}

      validate={(values)=>{
        let errores = {};
  
        //Validacion name
        if(!values.name){
          errores.name = "Please instert name"
        }
  
        //Validacion short description
        if(!values.shortDescription){
          errores.shortDescription = "Please instert short description"
        }

        //Validacion long description
        if(!values.longDescription){
            errores.longDescription = "Please instert long description"
          }

        //Validacion link
        if(!values.link){
            errores.link = "Please instert link"
          }  
        
        return errores;
      }}

      onSubmit={(values) =>{
          
        // empty method for future API request   
        console.log("form enviado");   
      }}
     >
       
      {( {values, errors, touched, handleSubmit, handleChange, handleBlur} )=>(   
        <form className="form-container" onSubmit={handleSubmit}>
            <label htmlFor="content">{name}</label>
            <input className="input-field" 
             type="text" 
             name="name" 
             value={values.name} 
             placeholder= "Enter new name"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
            {touched.name && errors.name && <div className="error">{errors.name}</div>}
             
            <label htmlFor="content">{logo}</label>
            <input className="input-field" 
             type="file" 
             name="logo"
             accept="image/jpeg, image/png" 
             value={values.logo}  
             placeholder="Enter new logo"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
            {touched.repassword && errors.repassword && <div className="error">{errors.repassword}</div>}
             
            <label htmlFor="content">{shortDescription}</label>
            <input className="input-field" 
             type="text" 
             name="shortDescription" 
             value={values.shortDescription} 
             placeholder="Enter new short description"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
            {touched.shortDescription && errors.shortDescription && <div className="error">{errors.shortDescription}</div>}
            
            <label htmlFor="content">{longDescription}</label>
            <input className="input-field" 
             type="text" 
             name="longDescription" 
             value={values.longDescription}  
             placeholder="Enter new long description"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
            {touched.longDescription && errors.longDescription && <div className="error">{errors.longDescription}</div>}
            
            <label htmlFor="content">{link}</label>
            <input className="input-field" 
             type="url" 
             name="link" 
             value={values.link}  
             placeholder="Enter new link"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
            {touched.link && errors.link && <div className="error">{errors.link}</div>}
             
            <button className="submit-btn" type="submit">Edit</button>
        </form>
      )}  
    </Formik>  
    );
}
 
export default EditForm;