import React, { useState } from 'react';
import '../FormStyles.css';
import * as yup from "yup";

const MembersForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    image: '',
    description: '',
    url: ''
  })

  const schema = yup.object().shape({
      name: yup.string().min(4).required("You have to provide a name that has at least 4 characters long."),
      image: yup.string()
      .matches(
        /\.(jpg|png)$/,
        "We only support .png or .jpg format files."
      )
      .required("You have to provide an image."),
      description: yup.string().required("You have to provide a description."),
      url: yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Please, provide a valid website.'
        )
        .required('Please, provide a website for your social media.')
    });


  const handleChange = (e) => {
    if(e.target.name === 'name'){
      setInitialValues({...initialValues, name: e.target.value})
    } if(e.target.name === 'image'){
      setInitialValues({...initialValues, image: e.target.value})
    } if(e.target.name === 'description'){
      setInitialValues({...initialValues, description: e.target.value})
    } if(e.target.name === 'url'){
      setInitialValues({...initialValues, url: e.target.value})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await schema.isValid(initialValues);
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input className="input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Name"></input>
      <input className="input-field" type="file" name="image" value={initialValues.image} onChange={handleChange} placeholder="Add your image"></input>
      <input className="input-field" type="text" name="description" value={initialValues.description} onChange={handleChange} placeholder="Write some description"></input>
      <input className="input-field" type="text" name="url" value={initialValues.url} onChange={handleChange} placeholder="Add your social media profile"></input>
      <button className="submit-btn" type="submit">Send</button>
    </form>
  );
}
 
export default MembersForm;