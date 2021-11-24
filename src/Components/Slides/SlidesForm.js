import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '../FormStyles.css';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
// need the total of slides to calculate the position to edit.
// Maybe we can fetch the slides.length to use in the select input, see orderOptions.
const TOTAL_SLIDES = 5;

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
        if (value.type) {
            if (!SUPPORTED_FORMATS.includes(value.type)) {
                return createError({
                    path: 'image',
                    message: `Valid formats are ${SUPPORTED_FORMATS}`
                });
            }
        }
        return true;
    })
});

const InputFile = ({name, setValue, initialValue, ...props}) => {
    const [img, setImg] = useState(initialValue);

    const handleFile = (event) => {
        setValue(name, event.currentTarget.files[0]);
        if (event.currentTarget.files[0]) {
            setImg(URL.createObjectURL(event.currentTarget.files[0]));
        } else {
            URL.revokeObjectURL(img);
            setImg(null);
        }
    }

    return (
        <>
            {img && <img src={img} alt="" width="100%" style={{maxWidth: "300px"}} />}
            <input 
                {...props}
                name={name}
                id={name}
                type="file"
                accept=".jpg, .png"
                onChange={handleFile}
            />
        </>
    )
}

const SlidesForm = ({slide}) => {
    
    const defaultValues = {
        name: '',
        description: '',
        order: TOTAL_SLIDES - 1,
        image: null
    };

    const orderOptions = [];

    for (let i = 0; i < TOTAL_SLIDES; i++) {
        const position = i;
        orderOptions.push(<option key={position} value={position}>{position + 1}</option>);
    }

    const handleCKEditor = (editor, setValue, name) => {
        setValue(name, editor.getData());
    }

    const handleSubmit = (values) =>{
        if (slide) {
            return console.log('PATCH/Slides/:id', values);
        }
        return console.log('POST/Slides/create', values);
    }

    return (
        <div>
            <Formik
                initialValues={slide || defaultValues}
                validationSchema={SlideSchema}
                onSubmit={values => handleSubmit(values)}
            >
                {({setFieldValue}) => (
                    <Form className="form-container">
                        <label htmlFor="name">Name</label>
                        <Field
                            className="input-field"
                            type="text"
                            name="name"
                        />
                        <ErrorMessage name="name" />
                        <label htmlFor="description">Description</label>
                        <CKEditor
                            id="description"
                            className="input-field"
                            editor={ClassicEditor}
                            data={slide? slide.description : ""}
                            onChange={(_, editor) => handleCKEditor(editor, setFieldValue, "description")}
                        />
                        <ErrorMessage name="description" />
                        <label htmlFor="image">Image</label>
                        <InputFile 
                            name="image"
                            setValue={setFieldValue}
                            initialValue={slide? slide.image : null}
                        />
                        <ErrorMessage name="image" />
                        <label htmlFor="order">Order</label>
                         <Field name="order" component="select">
                            {orderOptions}
                        </Field>
                        <ErrorMessage name="order" />
                        <button className="submit-btn" type="submit">Send</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SlidesForm;