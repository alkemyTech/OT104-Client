import React, { useState } from 'react';
import '../FormStyles.css';
import * as yup from "yup";

const TestimonialForm = () => {
    const [initialValues, setInitialValues] = useState({
       name: '',
       description: '', 
       image: ''
    });

    const schema = yup.object().shape({
      name: yup.string().min(4).required("You have to provide a name that has at least 4 characters long."),
      description: yup.string().required("You have to provide a description."),
      image: yup.string()
      .matches(
        /\.(jpg|png)$/,
        "We only support .png or .jpg format files."
      )
      .required("You have to provide an image.")
    });

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setInitialValues({...initialValues, name: e.target.value})
        } if(e.target.name === 'description'){
            setInitialValues({...initialValues, description: e.target.value})
        } if(e.target.name === 'image'){
            setInitialValues({...initialValues, image: e.target.value})
    }
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(initialValues);
        const isValid = await schema.isValid(initialValues);
        console.log(isValid);
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input className="input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Testimonial Title"></input>
            <input className="input-field" type="text" name="description" value={initialValues.description} onChange={handleChange} placeholder="Testimonial description"></input>
            <input className="input-field" type="file" name="image" value={initialValues.image} onChange={handleChange} placeholder="Testimonial image"></input>
            <button className="submit-btn" type="submit">Send</button>
        </form>
    );
}
 
export default TestimonialForm;