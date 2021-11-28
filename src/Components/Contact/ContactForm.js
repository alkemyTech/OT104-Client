import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";

const ContactForm = () => {

    const initialValues = {
        name:"",
        email:"",
        phone:"",
        message:""
    }

    function handleSubmit(values){
        console.log(values);
    }

    function handleErrors(values){
        let errors = {}
        if(!values.name){
            errors.name = "Por favor ingresa un nombre para continuar."
        }
        if(!values.email){
            errors.email = "Por favor ingresa un email para continuar."
        }else{
            const mailRegExp = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}/;
            if(!mailRegExp.test(values.email)){
                errors.email = "Por favor, ingresa un email con un formato válido."
            }
        }
        if(!values.message){
            errors.message = "Por favor ingresa un mensaje para continuar."
        }
        if(!values.phone){
            errors.phone = "Por favor ingresa un teléfono para continuar."
        }else{
            if(typeof values.phone !== "number"){
                errors.phone = "El teléfono ingresado solamente puede ser un número."
            }else{
                if(values.phone.toString().length<8){
                    errors.phone = "Por favor ingresa como teléfono un número de al menos 8 cifras."
                }
            }
        }

        return errors;
    }

    return(
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={handleErrors}
        >
        {({errors})=>(
            <Form>
                <div>
                    <label for="name">Nombre:</label>
                    <Field
                        name="name"
                        type="text"
                    />
                    <ErrorMessage
                        name="name"
                        component={()=>(<span>{errors.name}</span>)}
                    />
                </div>
                <div>
                    <label for="email">E-mail:</label>
                    <Field
                        name="email"
                        type="text"
                    />
                    <ErrorMessage
                        name="email"
                        component={()=>(<span>{errors.email}</span>)}
                    />
                </div>
                <div>
                    <label for="phone">Teléfono:</label>
                    <Field
                        name="phone"
                        type="number"
                    />
                    <ErrorMessage
                        name="phone"
                        component={()=>(<span>{errors.phone}</span>)}
                    />
                </div>
                <div>
                    <label for="message">Mensaje:</label>
                    <Field
                        name="message"
                        as="textarea"
                    />
                    <ErrorMessage
                        name="message"
                        component={()=>(<span>{errors.message}</span>)}
                    />
                </div>
                <input type="submit" value="Enviar Mensaje"/>
            </Form>
        )}

        </Formik>
    );
}

export default ContactForm;


