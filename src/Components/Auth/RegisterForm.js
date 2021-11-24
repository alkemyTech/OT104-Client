import React, { useState } from 'react';
import '../FormStyles.css';
import { Formik } from 'formik';

const RegisterForm = () => {
    

    return (
     <Formik
     initialValues={{ 
        name:"",
        lastName:"",
        email:"",
        password:"",
        repassword:""
      }}

      validate={(values)=>{
        let errores = {};
  
        //Validacion nombre
        if(!values.name){
          errores.name = "Por favor ingresa un nombre"
        }
  
        //Validacion last nambre
        if(!values.lastName){
          errores.lastName = "Por favor ingresa un apellido"
        }
        
        //Validacion email
        if(!values.email){
            errores.email = "Por favor ingresa un email"
          }else if  (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)){
            errores.password = "El email solo puede contener letras, numeros, puntos, guiones y guion bajo"
          }

        //Validacion password
        if(!values.password){
            errores.password = "Por favor ingresa una contraseña"
            console.log(values.password);
          }else if  (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(values.password)){
            errores.password = "La contraseña debe tener una longitud mínima de 6 caraceteres, y contener al menos un número, una letra y un símbolo"
          }
          

        //Validacion repassword
        if(values.repassword !== values.password){
            errores.repassword = "Las contraseñas no coinciden"
          }  


        return errores;
      }}

      onSubmit={(values, {resetForm}) =>{
        var userInfo = {
          name:values.name,
          lastName:values.lastName,
          email:values.email,
          password:values.password
      };
         console.log(userInfo);
        resetForm();     
      }}
     >
      {( {values, errors, touched, handleSubmit, handleChange, handleBlur} )=>(   
        <form className="form-container" onSubmit={handleSubmit}>
            <input className="input-field" 
             type="text" 
             name="name" 
             value={values.name} 
             placeholder="Enter name"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
             {touched.name && errors.name && <div className="error">{errors.name}</div>}
          
            <input className="input-field" 
             type="text" 
             name="lastName" 
             value={values.lastName} 
             placeholder="Enter last name"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
             {touched.lastName && errors.lastName && <div className="error">{errors.lastName}</div>}

            <input className="input-field" 
             type="text" 
             name="email" 
             value={values.email}  
             placeholder="Enter email"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
             {touched.email && errors.email && <div className="error">{errors.email}</div>}
            
            <input className="input-field" 
             type="text" 
             name="password" 
             value={values.password}  
             placeholder="Enter password"
             onChange={handleChange}
             onBlur={handleBlur} required></input>
             {touched.password && errors.password && <div className="error">{errors.password}</div>}
            
            <input className="input-field" 
              type="text" 
              name="repassword" 
              value={values.repassword}  
              placeholder="Confirm password"
              onChange={handleChange}
              onBlur={handleBlur} required></input>
              {touched.repassword && errors.repassword && <div className="error">{errors.repassword}</div>}
             
            <button className="submit-btn" type="submit">Register</button>
        </form>
      )}  
    </Formik>  
    );
}
 
export default RegisterForm;