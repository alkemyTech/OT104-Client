import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '../FormStyles.css';

const SlideSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'Name must be at least 4 characters long.')
        .required('Name is required.'),
    description: Yup.string()
        .required('Description is required.'),
    order: Yup.number()
        .required('Order is required.'),
    image: Yup.mixed()
    .test((value, {createError}) => {
        if (!value) {
            return createError({
                path: 'image',
                message: 'Image is required.'
            });
        }
        if (value.type !== 'image/jpg' || value.type !== 'image/png') {
            return createError({
                path: 'image',
                message: 'Valid formats are jpg and png.'
            });
        }
        return true;
    })
});

const InputFile = ({...props}) => {
    return (
        <input 
            {...props}
            type="file"
            accept=".jpg, .png"
        />
    )
}

const SlidesForm = ({slide}) => {
    
    const handleCKEditor = (editor, setValue, name) => {
        setValue(name, editor.getData());
    }

    const handleSubmit = (values) =>{
        console.log(values);
    }

    return (
        <div>
            <Formik
                initialValues={slide}
                validationSchema={SlideSchema}
                onSubmit={values => handleSubmit(values)}
            >
                {({errors, setFieldValue}) => (
                    <Form className="form-container">
                        {console.log(errors)}
                        <Field
                            className="input-field"
                            type="text"
                            name="name"
                        />
                        <CKEditor
                            id="description"
                            className="input-field"
                            editor={ClassicEditor}
                            onChange={(event, editor) => handleCKEditor(editor, setFieldValue, "description")}
                        />
                        <InputFile 
                            name="image"
                            onChange={event => setFieldValue("image", event.currentTarget.files[0])}
                        />
                         <Field name="order" component="select" className="input-field">
                            <option value={0}>1</option>
                            <option value={1}>2</option>
                            <option value={2}>3</option>
                        </Field>
                        <button className="submit-btn" type="submit">Send</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

SlidesForm.defaultProps = {
    slide: {
        name: '',
        description: '',
        order: null,
        image: null
    }
}

export default SlidesForm;