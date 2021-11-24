import React, { useState } from 'react';
import '../FormStyles.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ActivitiesForm = ({activityToEdit}) => {
    const isCreate = activityToEdit===undefined?false:true;
    const [initialValues, setInitialValues] = useState(
        isCreate?
            {
                name: '',
                image:'',
                description: ''
            }
        :
        activityToEdit
    );

    const handleChangeNameAndImage = (e) => {
        if(e.target.name==="name") setInitialValues({...initialValues, name: e.target.value});
        else if(e.target.name==="image") setInitialValues({...initialValues, image: e.target.value});
    }

    const handleChangeDescription = (event, editor) => {
            const data = editor.getData();
            setInitialValues({...initialValues, description: data})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(initialValues.name===""){
            alert("Por favor, introduzca un nombre para la actividad.");
            return
        }
        if(initialValues.description===""){
            alert("Por favor, introduzca una descripción para la actividad.");
            return
        }
        try{
            fetch(`http://apiurl/activities/${isCreate?"create":initialValues.id}`,{
                method:isCreate ? "patch":"post",
                body:JSON.stringify({
                    name: initialValues.name,
                    file:initialValues.file,
                    description:initialValues.description
                }),
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
            .then((data)=>`La actividad fue${isCreate?"creada":"modificada"} satisfactoriamente.`)
        }catch(error){
            alert(`No se pudo modificar la actividad. Error ${error.error}`)
        }
    }
    
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input 
                className="input-field" 
                type="text" 
                name="name" 
                value={initialValues.name} 
                onChange={handleChangeNameAndImage} 
                placeholder="Activity Title"
            />
            <input 
                className="input-field" 
                value="initialValues.image"
                type="file"
                name="image"
                onChange={handleChangeNameAndImage} 
                accept="image/png, image/jpeg"
            />
             <CKEditor
                className="input-field" 
                id="description"
                editor={ ClassicEditor }
                data={initialValues.description}
                onChange={handleChangeDescription}
            />
            <button className="submit-btn" type="submit">Send</button>
        </form>
    );
}
 
export default ActivitiesForm;