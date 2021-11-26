import React, { useState } from 'react';
import '../FormStyles.css';
import { Formik } from 'formik';


// test object
const organizationInfo = {
    name: "Alkemy code camp",
    logo: "https://via.placeholder.com/150",
    shortDescription: "Una breve descripcion de la informacion",
    longDescription: "Una descripion mas larga, donde se traigan mas detalles acerca de la organizacion, sus tareas, sus objetivos y sus plazos",
    facebook_url:"www.facebook.com\/Somos_M\u00e1s",
    linkedin_url:"www.linkedin.com\/company\/somosmas",
    instagram_url:"www.instagram.com\/SomosM\u00e1s",
    twitter_url:"www.twitter.com\/somosmas"
   };

   
const EditForm = (/*{organizationInfo}*/) => {
    
    const [name, setName] = useState(organizationInfo.name);
    const [logo, setLogo] = useState(organizationInfo.logo);
    const [shortDescription, setShortDescription] = useState(organizationInfo.shortDescription);
    const [longDescription, setLongDescription] = useState(organizationInfo.longDescription);
    const [facebook, setFacebook] = useState(organizationInfo.facebook_url);
    const [linkedin, setLinkedin] = useState(organizationInfo.linkedin_url);
    const [instagram, setInstagram] = useState(organizationInfo.instagram_url);
    const [twitter, setTwitter] = useState(organizationInfo.twitter_url);
    

    return (
        <Formik
     initialValues={{ 
        name: "",
        logo: "",
        shortDescription: "",
        longDescription: "",
        facebook_url: "",
        linkedin_url: "",
        instagram_url: "",
        twitter_url: "",
      }}

      validate={(values)=>{
        let errores = {};
  
        //Validacion name
        if(!values.name){
          errores.name = "Please instert name"
        }

        //Validacion logo
        if(!values.logo.includes(".jpg") | values.logo.includes(".png")){
            errores.logo = "Only .jpg and .png extensions are allowed"
          }
  
        //Validacion short description
        if(!values.shortDescription){
          errores.shortDescription = "Please instert short description"
        }

        //Validacion long description
        if(!values.longDescription){
            errores.longDescription = "Please instert long description"
          }
        
        return errores;
      }}

      onSubmit={(values) =>{
        let newInfo = {
            name: values.name,
            logo: values.logo,
            shortDescription: values.shortDescription,
            longDescription: values.longDescription,
            facebook_url: values.facebook_url,
            linkedin_url: values.linkedin_url,
            instagram_url: values.instagram_url,
            twitter_url: values.twitter_url,
        }
        // empty method for future API request 
         
        console.log(newInfo);   
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
            {touched.logo && errors.logo && <div className="error">{errors.logo}</div>}
             
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
            
            <label htmlFor="content">{facebook}</label>
            <input className="input-field" 
             type="url" 
             name="facebook_url" 
             value={values.facebook_url}  
             placeholder="Enter new link"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
            

            <label htmlFor="content">{linkedin}</label>
            <input className="input-field" 
             type="url" 
             name="linkedin_url" 
             value={values.linkedin_url}  
             placeholder="Enter new link"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
            

            <label htmlFor="content">{instagram}</label>
            <input className="input-field" 
             type="url" 
             name="instagram_url" 
             value={values.instagram_url}  
             placeholder="Enter new link"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
            

            <label htmlFor="content">{twitter}</label>
            <input className="input-field" 
             type="url" 
             name="twitter_url" 
             value={values.twitter_url}  
             placeholder="Enter new link"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
            
             
            <button className="submit-btn" type="submit">Edit</button>
        </form>
      )}  
    </Formik>  
    );
}
 
export default EditForm;