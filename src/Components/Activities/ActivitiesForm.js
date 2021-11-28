import React, { useState, useRef } from 'react';
import '../FormStyles.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormikProvider, Form, Field, ErrorMessage, useFormik } from "formik";

const ActivitiesForm = ({
    activityToEdit
}) => {
    const isCreate = activityToEdit===undefined?true:false;

    const fileInput = useRef();
    const descriptionInput = useRef();
    const [imageFile, setImageFile ] = useState("");
    const initialValues = 
        isCreate?
            {
                name: '',
                image:'',
                description: ''
            }
        :
        activityToEdit;

    const handleErrors = ( values ) => {
        let errors = {}
        if(!values.name){
            errors.name = "Por favor, ingrese un nombre."
        }
        if(!values.image){
            errors.image = "Por favor, ingrese una imagen."
        }

        return errors;
    }

    function handleFileChange(e){
        e.preventDefault();
        if(e.target.files[0]!==undefined){
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                formik.setFieldValue("image",reader.result, true);
                formik.validateField("image");
            };
            reader.onerror = (error)=>{
                fileInput.current.value = "";
                formik.setFieldValue("image","",true);
                formik.validateField("image")
                alert("No se pudo cargar el archivo de imagen. Error:" + error + ".");
            }
        }else{
            formik.setFieldValue("image","", true);
            formik.validateField("image");
        }
    }

    function handleDescriptionChange(__,editor){
        const data = editor.getData();
    }

    function handleDescriptionBlur(e){
        e.target = {};
        e.target.name="description";
        formik.handleBlur(e);
    } 

    const handleSubmit = async (values, { resetForm }) => {
        const now = new Date();

        let fetchBody = {
            name: values.name,
            slug:"",
            image:values.image,
            description:values.description,
            created_at: isCreate ? now.toISOString() : initialValues.created_at,
            updated_at:now.toISOString(),
            id:isCreate ? 0 : activityToEdit.id,
            user_id:isCreate ? 0 : activityToEdit.user_id,
            category_id:isCreate ? 0 : activityToEdit.category_id,
            deleted_at:isCreate ? null : activityToEdit.deleted_at
        }
        try{
            fetch(`http://ongapi.alkemy.org/api/activities/${isCreate?"":initialValues.id}`,{
                method:isCreate ? "post":"put",
                body:JSON.stringify(fetchBody),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then((res)=>{
                if(!res.ok){
                    throw {error: res.status};
                }else{
                    return res.json();
                }
            })
            .catch((error)=>console.error(error))
            .then((data)=>{
                if (data!==undefined)alert(`La actividad fue${isCreate?"creada":"modificada"} satisfactoriamente.`);
                else alert(`No se pudo ${isCreate?"crear":"modificar"} la actividad. Hubo un error`);
                if(isCreate===true) resetForm();
            })
        }catch(error){
            alert(`No se pudo ${isCreate?"crear":"modificar"} la actividad. Error ${error.error}`)
        }
    }

    const formik = useFormik(
        {
            initialValues: initialValues,
            onSubmit: handleSubmit,
            validate: handleErrors
        }
    )
    
    return (
        <FormikProvider value={formik}>  
            <Form className="form-container" encType="multipart/form-data">
                <div>
                    <Field
                        type="text" 
                        name="name" 
                        value={formik.values.name}
                        placeholder="Activity Title"
                        onChange={(e)=>{
                            formik.handleChange(e)
                            formik.validateField("name")
                        }}
                    />
                    <ErrorMessage 
                        name="name" 
                        component={()=><span>{formik.errors.name}</span>}
                    />
                </div>
                <div>
                    <input 
                        type="file"
                        name="image"
                        onChange={handleFileChange} 
                        accept="image/png, image/jpeg"
                        ref={fileInput}
                        onBlur={formik.handleBlur}
                    />
                    <ErrorMessage 
                        name="image" 
                        component={()=><span>{formik.errors.image}</span>}
                    />
                </div>
                <div>
                    <CKEditor
                        id="description"
                        editor={ ClassicEditor }
                        data={formik.values.description}
                        ref={descriptionInput}
                        onChange={handleDescriptionChange}
                        onBlur={handleDescriptionBlur}
                    />
                </div>
                <button type="submit">Send</button>
            </Form> 
        </FormikProvider>
    );
}
 
export default ActivitiesForm;